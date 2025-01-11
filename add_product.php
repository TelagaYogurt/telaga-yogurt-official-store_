<?php
    // Ambil data yang dikirimkan dari JavaScript
    $input = file_get_contents('php://input');
    $newProduct = json_decode($input, true);

    // Baca file products.json
    $jsonString = file_get_contents('products.json');
    $products = json_decode($jsonString, true);

    // Tambahkan produk baru
    $products[] = $newProduct;

    // Simpan kembali ke products.json
    if (file_put_contents('products.json', json_encode($products, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
?>
