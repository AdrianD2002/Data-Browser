<?php
    $i = $_POST['curr'] - 1;
    $obj = $_POST['newObj'];


    $fileName = 'data.json';
    $dataStr = file_get_contents($fileName);

    $data = json_decode($dataStr,true);
    $data['objArr'][$i] = json_decode($obj,true);
    $dataStr = json_encode($data);

    $file = fopen('data.json','w');
    fwrite($file,$dataStr);
    fclose($file);

    echo $dataStr;
?>