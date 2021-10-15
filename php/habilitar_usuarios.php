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

	if($parametro == "1"){
		$fecha = $_POST['fecha'];
		$simbolo = $_POST['simbolo'];
		$sql="call habilitar_edad('$fecha', '$simbolo');";
	}else if($parametro == "3"){
		$enfermedad = $_POST['enfermedad'];
		$sql="call habilitar_enfermedad('$enfermedad');";
	}else if($parametro == "2"){
		$trabajo = $_POST['trabajo'];
		$sql="call habilitar_trabajo('$trabajo');";
		
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

