<?php
header('Access-Control-Allow-Origin: *');

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
	$sql="select * from usuarios";
  	break;
	case 'POST':

	$dpi_usuario = $_POST['dpi_usuario'];
  	$name = $_POST["nombre_completo"];
  	$clave = $_POST["clave"];
  	$tipo_usuario = $_POST["tipo_usuario"];

	$password = password_hash($clave, PASSWORD_DEFAULT);
 	 
 	 
  	//$sql = "insert into usuarios (dpi_usuario, nombre_completo, clave, tipo_usuario) values ('$dpi_usuario', '$name', '$password', '$tipo_usuario');";
	$sql = "call nuevo_usuario('$dpi_usuario', '$password', '$tipo_usuario');";
	
  	break;
}

// run SQL statement
//echo $sql;
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'POST') {
	echo json_encode($result);
} else if ($method=='GET'){
	echo json_encode($result);
} else {
	echo mysqli_affected_rows($con);
 }

$con->close();


?>


