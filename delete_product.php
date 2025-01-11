<?php
    // Ambil data yang dikirimkan dari JavaScript
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $index = $data['index'];

    // Baca file products.json
    $jsonString = file_get_contents('products.json');
    $products = json_decode($jsonString, true);

    // Hapus produk berdasarkan index
    array_splice($products, $index, 1);

    // Simpan kembali ke products.json
    if (file_put_contents('products.json', json_encode($products, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
?>
