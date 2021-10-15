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
		$id=$_GET['id'];
  		$sql = "delete from titulo_texto where id_titulo='$id';";
  	break;

	case 'POST':
		
		$id = $_POST['id'];
		$texto=$_POST['texto'];	

		$sql="UPDATE titulo_texto SET texto='$texto' where id_titulo='$id';";

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
	
    echo json_encode($result);
  } else {
	echo mysqli_affected_rows($con);
  }

$con->close();


?>

