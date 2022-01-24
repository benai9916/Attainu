<?php
$servername = "localhost";
$username = "root";
$password = "benai123"; // put password if u have password for leave it blank =>''
$dbname = "student"; // add database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// sql to create table
$sql = "CREATE TABLE StudentDetail (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(30) NOT NULL,
RollNo INT NOT NULL,
attendance INt NOT NULL,
marks INT NOT NULL
)";

if (mysqli_query($conn, $sql)) {
    echo "Table MyGuests created successfully";
  } else {
    echo "Error creating table: " . mysqli_error($conn);
  }

$sql = "INSERT INTO StudentDetail (Name, RollNo, attendance, marks) 
VALUES('raj', 1, rand(1,100), rand(1,100)),
('kapil', 2, rand(1,100), rand(1,100)),
('monty', 3', rand(1,100), rand(1,100)),
('arjun', 4, rand(1,100), rand(1,100)) ";

if (mysqli_multi_query($conn, $sql)) {
    echo "New records created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

mysqli_close($conn);
?>