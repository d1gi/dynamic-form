<?php

$dsn = "mysql:host=127.0.0.1;dbname=dynamic_form;charset=UTF8";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {
    $pdo = new PDO($dsn, 'dynamic_form', '1234', $opt);
} catch (PDOException $e) {
    die('Подключение не удалось: '.$e->getMessage());
}

$search = strip_tags(trim($_GET['q']));
$stmt = $pdo->prepare('SELECT * FROM cities WHERE name LIKE :search LIMIT 30');
$stmt->execute([':search' => $search.'%']);

$data = [];

foreach ($stmt as $row) {
    $data[] = [
        'id'   => $row['id'],
        'name' => $row['name']
    ];
}

header('Content-Type: application/json');
echo json_encode($data);
