<?php
/*
* Template Name: Contact Template
*/

$context = Timber::get_context();
$page = new Timber\Post();



/* -------------------------- */
/* --- Pass datas to view --- */
/* -------------------------- */
$context['page'] = $page;

Timber::render( 'contact.twig', $context );