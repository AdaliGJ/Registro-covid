<?php

header('Access-Control-Allow-Origin: *');

session_start();



if (isset($_SESSION['username'])) {
      $dpi_usuario = $_SESSION['username'];
         echo "User ID:", $dpi_usuario, "<br />";
    } else {
        echo "Sesión inexistente";
    }

$host = "localhost";
$user = "root";
$password = "";
$dbname = "registro_covid";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'GET':
	
  	break;
}





$con->close();


?>
