<?php
    // MySQL Database Information
    $servername = "localhost";
    $username = "adalena2002";
    $password = "adalena2002";

    // Create the connection
    $conn = new mysqli($servername, $username, $password);

    // Select the Database
    $conn->select_db('csci130DB');

    // Get the count of records in the table
    $sql = 'SELECT COUNT(*) AS total FROM Dishes;';
    
    // Make the query
    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        echo $row['total'];
    } 
    else {
        echo '0';
    }

    // Close the connection
    $conn->close()
?>