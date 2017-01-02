<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false,
        // Renderer settings
        'renderer' => [
            'template_path' => 'templates/',
        ],
        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . 'logs/app.log',
        ],
    ],
];
