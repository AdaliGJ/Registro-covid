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
	$dpi_usuario = $_GET['dpi_usuario'];
  	 //"select dpi_usuario, tipo_usuario, nombre_completo from usuarios;";
	$sql ="select dr.*, u.nombre_completo, nombre_vacuna(vacuna) nombre_v, DATE(now()) hoy, dosis_vacuna(vacuna) dosis from usuarios u inner join datos_registro dr on (u.dpi_usuario = dr.dpi_persona) ".($dpi_usuario?" where u.dpi_usuario=$dpi_usuario":'').";"; 
	
	$result = mysqli_query($con,$sql);
	$count = mysqli_num_rows($result);
  	break;
	case 'POST':

	$dpi_usuario = $_POST['dpi_usuario'];
	$fecha1 = $_POST['fecha_primera_dosis'];
	$fecha2 = $_POST['fecha_segunda_dosis'];
	$fecha3 = $_POST['fecha_tercera_dosis'];
	$aplic1 = $_POST['primera_dosis'];
	$aplic2 = $_POST['segunda_dosis'];
	$aplic3 = $_POST['tercera_dosis'];
	$vacuna = $_POST['vacuna'];
  	$sql = "UPDATE datos_registro SET fecha_primera_dosis='$fecha1', primera_dosis='$aplic1', segunda_dosis='$aplic2', fecha_segunda_dosis='$fecha2', tercera_dosis='$aplic3', fecha_tercera_dosis='$fecha3', vacuna='$vacuna' where dpi_persona='$dpi_usuario';";
	
	$result = mysqli_query($con,$sql);
  	break;
}

// run SQL statement
//echo $sql;




// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
	if($count == 1){
		$usarray = array();
    		while($row =mysqli_fetch_assoc($result))
    		{
        		$usarray[] = $row;
    		}
    		echo json_encode($usarray);
	}else{
		echo json_encode("1");
	}
  } elseif ($method == 'POST') {
	echo mysqli_affected_rows($con);
  } else {
	echo mysqli_affected_rows($con);
  }

$con->close();


?>

