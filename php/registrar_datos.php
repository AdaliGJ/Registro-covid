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
	case 'POST':
	$dpi=$_POST['dpi'];
	$tel1=$_POST['tel1'];
	$tel2=$_POST['tel2'];
	$correo1=$_POST['email1'];
	$correo2=$_POST['email2'];
	$centro=$_POST['centro'];

	//$sql="call nuevo_registro('$dpi', '$tel1', '$tel2', '$correo1', '$correo2', '$centro');";
	$sql="call nuevo_registro('$dpi','$tel1','$tel2','$correo1','$correo2','$centro');"; 
	//$sql ="select * from correos;";	 
	
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

