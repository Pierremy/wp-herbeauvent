<?php
/*
* Template Name: Page commander
*/

$context = Timber::get_context();
$page = new Timber\Post();



/* -------------------------- */
/* --- Pass datas to view --- */
/* -------------------------- */
$context['page'] = $page;

Timber::render( 'page-commander.twig', $context );