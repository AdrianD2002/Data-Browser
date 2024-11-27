<?php
    $servername = "localhost"; // default server name
    $username = "adalena2002"; // user name that you created
    $password = "adalena2002"; // password that you created

    $conn = new mysqli($servername, $username, $password);

    // Check for existing database
    $sql = 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "csci130DB"';
    $result = $conn->query($sql);

    // If it doesn't exist, create it
    if (!($result && $result->num_rows > 0)) {

         // Creation of the database
        $sql = "CREATE DATABASE csci130DB";

        $conn->query($sql);

        $conn->select_db('csci130DB');

        $sql = "CREATE TABLE Dishes (
            id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
            dishName VARCHAR(255) NOT NULL,
            origin VARCHAR(255) NOT NULL, 
            myRating INT(10) NOT NULL,
            isServedAtJollibee BOOLEAN,
            mealType VARCHAR(255) NOT NULL,
            dishImage VARCHAR(255) NOT NULL
        )";

        $conn->query($sql);

        // Inserting initial records (using this syntax so I can avoid multi-query result retrieval blocking the get count)
        $sql = "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
        VALUES  ('Adobo','Phillipines',10,TRUE,'entree','images/adobo.png'),
                ('Lumpia','China',8,FALSE,'snack','images/lumpia.png'),
                ('Filipino Spaghetti','Italy',10,TRUE,'entree','images/spaghetti.png'),
                ('Sinigang','Phillipines',9,FALSE,'entree','images/sinigang.png'),
                ('Halo-halo','Japan',8,TRUE,'dessert','images/halohalo.png'),
                ('Turon','Phillipines',9,FALSE,'dessert','images/turon.png'),
                ('Sisig','Phillipines',8,FALSE,'entree','images/sisig.png'),
                ('Kare-kare','Phillipines',10,FALSE,'entree','images/karekare.png'),
                ('Boy Bawang','Phillipines',7,FALSE,'snack','images/boybawang.png'),
                ('Skyflakes','Phillipines',8,FALSE,'snack','images/skyflakes.png');";

        $conn->query($sql);
    }
    else {
        $conn->select_db('csci130DB');
    }

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