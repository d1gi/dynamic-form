<?php

$ships = [
    [
        'name' => 'Avrora',
        'speed' => 30,
        'weight' => 150,
    ],
    [
        'name' => 'Varyag',
        'speed' => 35,
        'weight' => 150,
    ],
    [
        'name' => 'Lenin',
        'speed' => 50,
        'weight' => 500,
    ],
];

echo "<pre>";
echo json_encode($ships, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
echo "</pre>";
