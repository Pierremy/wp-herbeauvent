<?php 

namespace WS_2020\inc;

use WS_2020\inc\core\AbstractController;
use Timber;

class AjaxRequests extends AbstractController
{
    public function __construct()
    {
        $this->handle_request($this, 'test');
        $this->handle_request($this, 'handle_form_contact');
        $this->handle_request($this, 'add_to_cart');
        
        date_default_timezone_set('Europe/Paris');
    }

    public function test()
    {
        $output = 'Hello world 👋';

        wp_send_json($output);
        wp_die();
    }

    /**
     * Woocommerce - Add product to cart
     */
    function add_to_cart() {
        if (!isset($_POST['product_id'])) {
            return null;
        }

        $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
        $product = wc_get_product($product_id);
        $quantity = empty($_POST['quantity']) ? 1 : wc_stock_amount(wp_unslash($_POST['quantity']));
        $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity);
        $variation_id = 0;
        $variation = [];

        if ($product && 'variation' === $product->get_type()) {
            $variation_id = $product_id;
            $product_id = $product->get_parent_id();
            $variation = $product->get_variation_attributes();
        }

        if ($passed_validation && false !== WC()->cart->add_to_cart($product_id, $quantity, $variation_id, $variation)) {
            do_action('woocommerce_ajax_added_to_cart', $product_id);
            $cartCount = WC()->cart->get_cart_contents_count();
            $output = [
                "status"  => "success",
                "data"	  => [
                    "cart_count" => $cartCount,
                ],
                "message" => $quantity > 1 ? "<p><b>{$quantity}</b> «{$product->get_name()}»<br/><span>Ajoutés au panier</span></p><a href=''>Voir le panier</a>" : "<p><b>{$quantity}</b> «{$product->get_name()}»<br/><span>Ajouté au panier</span></p><a href='https://www.ivanvautier.com/panier/'>Voir le panier</a>"
            ];

        } else {
            $output = [
                "status"  => "error",
                "data"	  => [],
                "message" => "Impossible d'ajouter le(s) produit(s) au panier"
            ];
        }
        
        wp_send_json($output);
        wp_die();
    }

    public function handle_form_contact()
    {
        if (!isset($_POST['contact']) || empty($_POST['contact'])) wp_die();

        //ACF contact adress
        /*$options = get_fields('option');
        $email = $options['contact_support_devis']['email_de_contact'];*/
        $email = 'contact@wesign.fr';

        //$this->verifyCaptcha();

        //Send to website owner
        /*$html = Timber::compile('mails/contact.twig', ['form' => $_POST['contact'], 'to' => 'owner']);
        if (wp_mail([$email], "Demande de contact depuis votre site web", $html)) {
            //Send confirmation to user
            $html = Timber::compile('mails/contact.twig', ['form' => $_POST['contact'], 'to' => 'user']);
            wp_mail($_POST['contact']['email'], "SITENAME - Votre demande de contact a bien été transmise", $html);

            wp_send_json(['status' => 'success', 'message' => __('Votre demande a bien été transmise', 'ws-starter')]);
            wp_die();
        }*/

        //Falback if mail() failed
        wp_send_json(['status' => 'error', 'message' => __('Impossible de transmettre votre demande, réessayez plus tard.', 'ws-starter')]);
        wp_die();
    }
}