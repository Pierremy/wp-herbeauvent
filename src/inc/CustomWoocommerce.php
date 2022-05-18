<?php

namespace WS_2020\inc;

class CustomWoocommerce {

    public function __construct()
	{
        $this->manage_woocommerce_filters();
        $this->manage_woocommerce_actions();
    }

    

    public function manage_woocommerce_filters()
	{
        add_filter( 'show_admin_bar', [$this, 'hide_admin_bar_if_non_admin'], 20, 1 );
        add_filter('nav_menu_css_class' , [$this, 'special_nav_class'], 10 , 2);
        add_filter('woocommerce_product_single_add_to_cart_text', [$this, 'woocommerce_custom_add_to_cart_text']);
    }

    public function manage_woocommerce_actions()
	{

        //add_action( 'woocommerce_before_add_to_cart_quantity', [$this, 'add_quantite_label'] );
        //add_action( 'woocommerce_order_status_changed', [$this, 'custom_woocommerce_auto_complete_order'], 10, 4);

        remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
        remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
        remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
        remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 40 );
        
        //add_action( 'woocommerce_single_product_summary', 'the_content', 40 );
        add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 70 );
        add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 60 );
        
        //Ajout panier sur single-produit
        add_action('display_add_to_cart_form', 'woocommerce_template_single_add_to_cart');
    }

    function woocommerce_custom_add_to_cart_text() {
        return __('', 'woocommerce');
    }

    public function hide_admin_bar_if_non_admin( $show ) {
        if ( ! current_user_can( 'administrator' ) ) $show = false;
        return $show;
    }
     
    public function special_nav_class ($classes, $item) {
        if (in_array('current-menu-item', $classes) ){
            $classes[] = 'menu-item-active ';
        }
        return $classes;
    }

    /*public function custom_woocommerce_auto_complete_order($order_id, $this_status_transition_from, $this_status_transition_to, $instance) {
        
        if (!$order_id)  { return; }

        if ($this_status_transition_to !== 'processing') { return; }

        $order = wc_get_order($order_id);
        $order->update_status('completed');

    }*/

    public function add_quantite_label() {
        global $product;

        echo '<div class="quantity">Quantité souhaitée</div>';
    }
}