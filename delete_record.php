<?php
    // Get current object index from POST request
    $target = isset($_POST['str']) ? $_POST['str'] : 0;

    // MySQL Database Information
    $servername = "localhost";
    $username = "csci130";
    $password = "csci130";

    // Create the connection
    $conn = new mysqli($servername, $username, $password);

    // Select the Database
    $conn->select_db('csci130DB');

    // Delete the current object
    $sql = 'DELETE FROM Dishes WHERE id = ' . $target . ';';

    // Update the IDs in the table
    $sql .= 'SET @new_id = 0;';
    $sql .= 'UPDATE Dishes SET id = (@new_id := @new_id + 1) ORDER BY id;';
    $sql .= 'ALTER TABLE Dishes AUTO_INCREMENT = 1;';
    
    // Make the query
    if ($conn->multi_query($sql) === TRUE) {
        echo "Record deleted successfully\n";
    } 
    else {
        echo "Error deleted record: " . $conn->error . "\n";
    }

    // Close the connection
    $conn->close()
?>