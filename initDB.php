<?php
    $servername = "localhost"; // default server name
    $username = "adalena2002"; // user name that you created
    $password = "adalena2002"; // password that you created

    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error ."\n");
    }
    else {
        echo "Connected successfully \n";
    }

    // Delete existing database
    $sql = 'DROP DATABASE csci130DB';
    if ($conn->query($sql)) {
        echo "Old database successfully dropped\n";
    } 
    else {
        echo 'Error dropping database: ' . $conn->error . "\n"; 
    }	

    // Creation of the database
    $sql = "CREATE DATABASE csci130DB";
    if ($conn->query($sql) === TRUE) {
        echo "New database created successfully\n";
    } 
    else {
        echo "Error creating database: " . $conn->error ."\n";
    }

    $conn->select_db('csci130DB');

    // Creation of a table
    // id = a unique identifier that is created automatically 
    // varchar(n) = string of n characters max 
    $sql = "CREATE TABLE Dishes (
        id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
        dishName VARCHAR(255) NOT NULL,
        origin VARCHAR(255) NOT NULL, 
        myRating INT(10) NOT NULL,
        isServedAtJollibee BOOLEAN,
        mealType VARCHAR(255) NOT NULL,
        dishImage VARCHAR(255) NOT NULL
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Dishes table created successfully\n";
    } 
    else {
        echo "Error creating table: " . $conn->error ."\n";
    }

    // Inserting initial records
    $sql = "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Adobo','Phillipines',10,TRUE,'entree','images/adobo.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Lumpia','China',8,FALSE,'snack','images/lumpia.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Filipino Spaghetti','Italy',10,TRUE,'entree','images/spaghetti.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Sinigang','Phillipines',9,FALSE,'entree','images/sinigang.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Halo-halo','Japan',8,TRUE,'dessert','images/halohalo.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Turon','Phillipines',9,FALSE,'dessert','images/turon.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Sisig','Phillipines',8,FALSE,'entree','images/sisig.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Kare-kare','Phillipines',10,FALSE,'entree','images/karekare.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Boy Bawang','Phillipines',7,FALSE,'snack','images/boybawang.png');";

    $sql .= "INSERT INTO Dishes (dishName, origin, myRating, isServedAtJollibee, mealType, dishImage) 
            VALUES ('Skyflakes','Phillipines',8,FALSE,'snack','images/skyflakes.png');";


    if ($conn->multi_query($sql) === TRUE) {
        echo "Records inserted successfully\n";
    } 
    else {
        echo "Error inserting record: " . $conn->error . "\n";
    }
?>