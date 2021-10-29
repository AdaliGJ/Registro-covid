<?php
header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "registro_covid";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];



if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	
	case 'POST':
	$dpi=$_POST['dpi'];
	$nombre = $_POST['nombre'];

	
	$sql="insert into solicitudes_empleados (dpi_empleado, nombre_completo) values ('$dpi','$nombre');";
	
	break;
}


$result = mysqli_query($con,$sql);


if (!$result) {
 http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'POST') {
	echo mysqli_affected_rows($con);
  } else {
	echo mysqli_affected_rows($con);
  }

$con->close();


?>

