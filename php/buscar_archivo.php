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
	$id=$_GET['id_archivo'];
  	$sql = "select i.*, u.fecha_inscripcion, dosis_vacuna(i.vacuna) dosis_vacuna, u.nombre_completo, nombre_vacuna(i.vacuna) nombre_vacuna from pdf_proceso i inner join usuarios u on (i.dpi_persona = u.dpi_usuario) where id_archivo = '$id' order by i.fecha_creacion desc limit 1;";
  	break;
	
	
		
}

// run SQL statement
//echo $sql;
$result = mysqli_query($con,$sql);
$count = mysqli_num_rows($result);

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

