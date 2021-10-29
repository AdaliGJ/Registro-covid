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
  	$sql = "select i.*, u.fecha_inscripcion, dosis_vacuna(i.vacuna) dosis_vacuna, u.nombre_completo, nombre_vacuna(i.vacuna) nombre_vacuna from pdf_proceso i inner join usuarios u on (i.dpi_persona = u.dpi_usuario) where dpi_persona = '$dpi' order by i.fecha_creacion desc limit 1;";
  	break;
	
	case 'POST':
	$dpi=$_POST['dpi'];
	
	$sql="call generar_pdf('$dpi');"; 
	 
	
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
	//$info = $result->fetch_assoc();
	$emparray = array();
    	while($row =mysqli_fetch_assoc($result))
    	{
        	$emparray[] = $row;
    	}
    	echo json_encode($emparray);
    	//echo json_encode($info);
  } else {
	echo mysqli_affected_rows($con);
  }

$con->close();


?>

