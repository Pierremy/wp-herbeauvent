<?php
/*
* Template Name: Yoga et meditation Template
*/

$context = Timber::get_context();
$page = new Timber\Post();



/* -------------------------- */
/* --- Pass datas to view --- */
/* -------------------------- */
$context['page'] = $page;

Timber::render( 'yoga.twig', $context );