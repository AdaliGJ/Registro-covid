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
	$dpi=$_GET['dpi'];
	$sql="select *, profesion_persona_id('$dpi') trabajo, es_usuario('$dpi') es_usuario, enfermedad_id('$dpi') enfermedad from poblacion where dpi=$dpi;";
	
	break;

	case 'POST':
	$dpi=$_POST['dpi'];
	$nombre=$_POST['nombre'];
	$nacionalidad=$_POST['nacionalidad'];
	$fecha=$_POST['fecha_nacimiento'];
	$sexo=$_POST['sexo'];
	$trabajo=$_POST['trabajo'];
	$enfermedad=$_POST['enfermedad'];

	
	$sql="call update_poblacion('$dpi','$nombre','$nacionalidad','$sexo','$fecha','$trabajo','$enfermedad');"; 
		 
	
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

if ($method == 'GET') {
	$usarray = array();
    	while($row =mysqli_fetch_assoc($result))
    	{
        	$usarray[] = $row;
    	}
    echo json_encode($usarray);
  } else {
	echo mysqli_affected_rows($con);
  }

$con->close();


?>

