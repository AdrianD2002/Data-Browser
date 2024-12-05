<?php
    // Get current object index and sort type from GET request
    $i = isset($_GET['curr']) ? $_GET['curr'] : 0;
    $sortIndex = isset($_GET['sortIndex']) ? $_GET['sortIndex'] : 1;

    // MySQL Database Information
    $servername = "localhost";
    $username = "csci130";
    $password = "csci130";

    // Create the connection
    $conn = new mysqli($servername, $username, $password);

    // Select the Database
    $conn->select_db('csci130DB');

    // Check if querying by name or index
    if ($sortIndex) {
        $sql = "SELECT id, dishName, origin, myRating, isServedAtJollibee, mealType, dishImage 
        FROM Dishes
        WHERE id = ?";
    }
    else {
        $sql = "SELECT id, dishName, origin, myRating, isServedAtJollibee, mealType, dishImage 
        FROM Dishes
        ORDER BY dishName
        LIMIT 1 OFFSET ?";

        $i = $i - 1;
    }

    // Prepare statement for execution
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $i);

    //Execute and get result
    $stmt->execute();
    $result = $stmt->get_result();
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
    $conn->close();
    $stmt->close();
?>