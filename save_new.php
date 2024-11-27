<?php
    // Get data from POST request
    $dataStr = isset($_POST['str']) ? $_POST['str'] : null;
    echo $dataStr;
    $data = json_decode($dataStr, true);

    // MySQL Database Information
    $servername = "localhost";
    $username = "adalena2002";
    $password = "adalena2002";

    // Create the connection
    $conn = new mysqli($servername, $username, $password);

    // Select the Database
    $conn->select_db('csci130DB');

    // Prepare a record insertion query
    $sql = 'INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage)
            VALUES (?,?,?,?,?,?)';

    // Set up the query for execution
    $stmt = $conn->prepare($sql);

    // Error check
    if ($stmt==FALSE) {
        echo "There is a problem with prepare: \n";
        echo $conn->error;
    }

    // Bind the parameters
    $stmt->bind_param('ssiiss', $dishName, $origin, $myRating, $isServedAtJollibee, $mealType, $dishImage);

    // Assign the arguments
    $dishName = $data["dishName"];
    $origin = $data["origin"];
    $myRating = $data["myRating"];
    $isServedAtJollibee = $data["isServedAtJollibee"];
    $mealType = $data["mealType"];
    $dishImage = $data["dishImage"];

    // Execute with arguments
    $stmt->execute();

    // Close connection
    $stmt->close();
    $conn->close();
?>