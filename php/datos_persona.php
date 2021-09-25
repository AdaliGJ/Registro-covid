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
  	$sql = "select p.*, tipo_usuario('$dpi') tipo_usuario, tel2_persona('$dpi') tel2, tel1_persona('$dpi') tel1, correo1_persona('$dpi') email1, correo2_persona('$dpi') email2, profesion_persona('$dpi') profesion from poblacion p".($dpi?" where dpi=$dpi":'').";";
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

