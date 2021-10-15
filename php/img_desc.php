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
		$file = $_FILES['img'];
		$texto=$_POST['texto'];	

		$nombre_img = $_FILES['img']['name'];

		$carpeta_destino = $_SERVER['DOCUMENT_ROOT'].'/webimages/';

		move_uploaded_file($_FILES['img']['tmp_name'], $carpeta_destino.$nombre_img);
		
		
		$sql="INSERT INTO imagen_descripcion (imagen, descripcion) VALUES ('$nombre_img', '$texto');";
	
	break;	

	case 'GET':
  	$sql = "select * from imagen_descripcion";
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

