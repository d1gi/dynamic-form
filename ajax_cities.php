<?php

$dsn = "mysql:host=127.0.0.1;dbname=dynamic_form;charset=uft-8";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];
$pdo = new PDO($dsn, 'dynamic_form', '1234', $opt);

$search = strip_tags(trim($_GET['q']));
$stmt = $pdo->prepare('SELECT * FROM cities WHERE name LIKE :search LIMIT 30');
$stmt->execute([':search' => $search.'%']);

foreach ($stmt as $row)
{
    $data[] = [
        'id'   => $row['id'],
        'name' => $row['name']
    ];
}

echo json_encode($data);
