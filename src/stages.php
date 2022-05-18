<?php
/*
* Template Name: Stages et ateliers Template
*/

$context = Timber::get_context();
$page = new Timber\Post();



/* -------------------------- */
/* --- Pass datas to view --- */
/* -------------------------- */
$context['page'] = $page;

Timber::render( 'stages.twig', $context );