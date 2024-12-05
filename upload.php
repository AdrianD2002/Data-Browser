<?php
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);

    $uploadOk = 1;

    if (!isset($_FILES['file'])) {
        echo "Error: invalid/no file received.\n";
        $uploadOk = 0;
    }

    // Verify file is an image
    if (getimagesize($_FILES["file"]["name"]) === false)  {
        echo "File is not an image\n";
        $uploadOk = 0;
    }

    // Verify the file size (up to 1MB)
    if ($_FILES["file"]["size"] > 1000000) {
        echo "The file is too large.\n";
        $uploadOk = 0;
    }

    // Verify certain file formats
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "webp") {
        echo "Only jpg, png, and webp files are allowed for the upload.";
        $uploadOk = 0;
    }

    if($uploadOk == 0){
        echo "File upload denied.\n";
    }
    else {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.\n";
        } else {
            echo "Error uploading your file.\n";
        }
    }
?>