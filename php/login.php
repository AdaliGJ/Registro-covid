<?php
header('Access-Control-Allow-Origin: *');

session_start();

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

	$dpi_usuario = $_POST['dpi_usuario'];
  	$clave = $_POST["clave"];

	$password = password_hash($clave, PASSWORD_DEFAULT);
 	 
 	 
  	$sql = "select * from usuarios where dpi_usuario = '$dpi_usuario';";
	
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

if ($count == 1) {
	$info = $result->fetch_assoc();
        $encriptado_db = $info['clave'];
	if(password_verify($clave, $encriptado_db)){
		$_SESSION['login_user'] = $dpi_usuario;
		echo json_encode(array('dpi'=>$info['dpi_usuario'], 'clave'=>$info['clave'], 'tipo_usuario'=>$info['tipo_usuario'] ) );
	}else{
		http_response_code(404);
	}
  } else {
		http_response_code(404);
  }

$con->close();


?>

