<?php

if (!class_exists( 'Timber' )) {
    echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
    return;
}

$context = Timber::get_context();

if ( is_singular( 'product' ) ) {

    $context['post'] = Timber::get_post();
    $product = wc_get_product( $context['post']->ID );
    $product->thumbnail = get_the_post_thumbnail_url( $context['post']->ID);
    $context['product'] = $product;
    $context['page_type'] = 'single-product';

    /*if( $product->is_type( 'simple' ) ){
        $context['product_type'] = 'product-simple';
    }else{
        $context['product_type'] = 'product-variable';
    }*/

    /*$terms = get_the_terms($post->ID, 'product_cat');

    foreach ($terms as $term) {
        $context['term'] = $term;
    }*/

    $attachment_ids = $product->get_gallery_image_ids();
    $product_gallery = array();
    
    foreach( $attachment_ids as $attachment_id ) {
        $image_link = wp_get_attachment_url( $attachment_id );
        $image_title = get_the_title($attachment_id);

        $image = array(
            "url" => $image_link,
            "title" => $image_title
        );

        array_push($product_gallery, $image);
    }

    $context['product_gallery'] = $product_gallery;
    

    /*$related_products = Timber::get_posts(array(
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'product_cat'    =>  $context['term']->slug,
        'post__not_in'   => array($context['post']->id),
        'posts_per_page' => 4
    ));*/

    //wp_reset_postdata();

    //$context['related_products'] = get_products_price($related_products);

    Timber::render( 'templates/layouts/single-product.twig', $context );

} elseif ( is_product_category() ) {

    $category = get_queried_object();

    $context['category'] = $category; 

    //$context["acf"] = get_field_objects("product_cat_".$category->term_id);

    $context['term'] = get_term($category->term_id);

    $context['page_type'] = 'prod-category';

    $products = Timber::get_posts(array(
        'post_type'      => 'product',
        'post_status'  => 'publish',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'product_cat',
                'field'    => 'slug',
                'terms'    => get_queried_object()->slug,
            )
        )
    ));

    foreach ($products as $key => $prod) {
        $prod->permalink = get_permalink( $prod->ID );
        $prod->thumbnail = get_the_post_thumbnail_url( $prod->ID);
    }

    $context['products'] = /*get_products_price(*/$products/*)*/;

    
    Timber::render( 'templates/layouts/category.twig', $context );

}else if(is_shop()){

    $page = new Timber\Post();

    $terms = get_terms(
        array(
            'taxonomy' => 'product_cat',
            'orderby' => 'menu_order',
            'exclude' => 21,
        ) 
    );


    foreach ($terms as $key => $cat) {
        $prods = Timber::get_posts(array(
            'post_type'      => 'product',
            'post_status'  => 'publish',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'product_cat',
                    'field'    => 'slug',
                    'terms'    => $cat->slug,
                )
            )
        ));

        foreach ($prods as $key => $prod) {
            $prod->permalink = get_permalink( $prod->ID );
            $prod->thumbnail = get_the_post_thumbnail_url( $prod->ID);
        }

        $thumb_id = get_term_meta( $cat->term_id, 'thumbnail_id', true );
        $cat->thumbnail = wp_get_attachment_url( $thumb_id );
        $cat->permalink = get_term_link( $cat->term_id, 'product_cat' );
        $cat->products = $prods;
    }


    /* -------------------------- */
    /* --- Pass datas to view --- */
    /* -------------------------- */
    $context['page'] = $page;
    $context['categories'] = $terms;

    Timber::render( 'boutique.twig', $context );

}