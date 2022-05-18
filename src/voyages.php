<?php
/*
* Template Name: Voyages interieurs Template
*/

$context = Timber::get_context();
$page = new Timber\Post();



/* -------------------------- */
/* --- Pass datas to view --- */
/* -------------------------- */
$context['page'] = $page;

Timber::render( 'voyages.twig', $context );