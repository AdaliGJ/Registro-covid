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
		$dpi = $_GET['dpi'];
  		$sql = "select count(*) conteo from solicitudes_empleados where dpi_empleado = '$dpi';";
  	break;

	case 'POST':
		$dpi = $_POST['dpi'];
		$sql = " delete from solicitudes_empleados where dpi_empleado = '$dpi';";
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
	$info = $result->fetch_assoc();
        $contador = $info['conteo'];

    	
    echo json_encode($contador);
  } else {
	$arows = mysqli_affected_rows($con);
	if($arrows == 1){
		echo 1;
	}
  }

$con->close();


?>

