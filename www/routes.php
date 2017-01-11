<?php
$app->get('/', function($request, $response, $args) {
    require __DIR__ . '/templates/index.php';
});

$app->post('/send-email', function($request, $response, $args) {
    require __DIR__ . '/templates/send-email.php';
});
