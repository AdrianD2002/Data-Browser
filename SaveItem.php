<?php
    $i = $_POST['i'];
    $obj = $_POST['obj'];

    $file = fopen('data.json');
    $dataStr = $fread($file);
    fclose($file);

    $data = json_decode($dataStr,true);
    $obj = json_decode($obj,true);
    $data[$i] = $obj;
    $dataStr = json_encode($data);

    echo $data;

    $file = fopen('data.json','w');
    fwrite($file,$dataStr);
    fclose($file);
?>