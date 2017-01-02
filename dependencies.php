<?php
$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('CCT_Logger');
    $file_handler = new \Monolog\Handler\StreamHandler('../logs/ejr_' . date('Y-m-d') . '.log');
    $logger->pushHandler($file_handler);
    return $logger;
};
