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
		$centro = $_GET['centro'];
		$fecha = $_GET['dia'];
		
		if($centro==0){
			if($fecha==''){
				$sql = "select fecha_dosis fecha, puesto_registro, nombre_centro, vacuna, nombre_vacuna, count(*) vacunas_aplicadas from reportes_centro group by vacuna, fecha_dosis, puesto_registro order by puesto_registro, fecha_dosis;";
			}else{
				$sql = "select fecha_dosis fecha, puesto_registro, nombre_centro, vacuna, nombre_vacuna, count(*) vacunas_aplicadas from reportes_centro where fecha_dosis = '$fecha' group by vacuna, fecha_dosis, puesto_registro order by puesto_registro, fecha_dosis;";
			}
		}else{
			
			if($fecha==''){
				$sql = "select fecha_dosis fecha, puesto_registro, nombre_centro, vacuna, nombre_vacuna, count(*) vacunas_aplicadas from reportes_centro where puesto_registro = '$centro' group by vacuna, fecha_dosis, puesto_registro order by puesto_registro, fecha_dosis;";
			}else{
				$sql = "select fecha_dosis fecha, puesto_registro, nombre_centro, vacuna, nombre_vacuna, count(*) vacunas_aplicadas from reportes_centro where puesto_registro = '$centro' AND fecha_dosis = '$fecha' group by vacuna, fecha_dosis, puesto_registro order by puesto_registro, fecha_dosis;";
			}
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

