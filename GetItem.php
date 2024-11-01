<?php
    $filename = 'data.json';
    $str = file_get_contents($filename);

    $i = isset($_GET['curr']) ? $_GET['curr'] - 1 : 0;
    $data = json_decode($str,true);
    
    header('Content-Type: application/json');

    if (isset($data['objArr'][$i])) {
        echo json_encode($data['objArr'][$i]);
    } else {
        echo json_encode(null);
    }
?>