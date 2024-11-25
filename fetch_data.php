<?php
    // Get current object index from GET request
    $i = isset($_GET['curr']) ? $_GET['curr']: 0;

    // MySQL Database Information
    $servername = "localhost";
    $username = "adalena2002";
    $password = "adalena2002";

    // Create the connection
    $conn = new mysqli($servername, $username, $password);

    // Select the Database
    $conn->select_db('csci130DB');

    // Select an object
    $sql = "SELECT dishName, origin, myRating, isServedAtJollibee, mealType, dishImage 
    FROM Dishes
    WHERE id = " . $i;
    
    // Make the query
    $result = $conn->query($sql);
    
    // Set the header
    header('Content-Type: application/json');

    // Check that the result isn't empty
    if ($result) {
        $record = $result->fetch_assoc();
        $dataStr = json_encode($record);
        echo $dataStr;
    } 
    else { // If it is, send a null object
        echo json_encode(null);
    }

    // Close the connection
    $conn->close()
?>