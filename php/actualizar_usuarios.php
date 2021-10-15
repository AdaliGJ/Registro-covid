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
  	$sql = "select * from enfermedad_cronica";
  	break;
	
	case 'POST':
	$parametro=$_POST['parametro'];
	$fecha = $_POST['fecha'];

	if($parametro == "1"){
		$sql="update datos_registro set fecha_primera_dosis = '$fecha' where fecha_primera_dosis = 0;";
	}else if($parametro == "2"){
		$centro = $_POST['centro'];

		$sql="update datos_registro set fecha_primera_dosis = '$fecha' where fecha_primera_dosis = 0 and puesto_registro = '$centro';";
	}
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

