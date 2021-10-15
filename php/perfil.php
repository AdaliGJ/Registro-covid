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
  	$sql = "select * from info_usuarios where dpi = '$dpi';";
  	break;
	
	case 'POST':
	$dpi=$_POST['dpi'];
	$tel1=$_POST['tel1'];
	$tel2=$_POST['tel2'];
	$correo1=$_POST['email1'];
	$correo2=$_POST['email2'];
	
	$sql="call actualizar_registro('$dpi','$tel1','$tel2','$correo1','$correo2');"; 
	 
	
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

