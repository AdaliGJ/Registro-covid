<?php
header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "registro_covid";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);
//Needed for infile
mysqli_options($con, MYSQLI_OPT_LOCAL_INFILE, true);

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'GET':
  	$sql = "select id_vacuna, nombre from vacunas";
  	break;

	case 'POST':

	$total_row = count(file($_FILES['csv']['tmp_name']));
	//$file_location = $_FILES['csv']['tmp_name'];
	$file_location = str_replace("\\", "/", $_FILES['csv']['tmp_name']);
	$nombre = $_POST['file'];
	$file = $_FILES['csv'];

	
	$sql = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE poblacion FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" IGNORE 1 LINES (@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9) SET dpi = @column1, nombre_completo = @column2,  fecha_nacimiento = STR_TO_DATE(@column3, "%d/%m/%Y"), genero = @column8, nacionalidad = @column9;';
	$sql2 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE telefonos FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" IGNORE 1 LINES (@column1,@column2,@column3,@column4,@column5) SET dpi_persona = @column1, telefono = @column5;';
	$sql3 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE correos FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" IGNORE 1 LINES (@column1,@column2,@column3,@column4) SET dpi_persona = @column1, correo = @column4;';
	$sql4 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE persona_profesion FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" IGNORE 1 LINES (@column1,@column2,@column3,@column4,@column5,@column6) SET dpi_persona = @column1, id_profesion = @column6;';
	$sql5 = 'LOAD DATA LOCAL INFILE "'.$file_location.'" IGNORE INTO TABLE poblacion_enferma FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" IGNORE 1 LINES (@column1,@column2,@column3,@column4,@column5,@column6,@column7) SET dpi_persona = @column1, id_enfermedad = @column7;';
	$sql6 = "delete from poblacion_enferma where id_enfermedad = 0;";
}

// run SQL statement
//echo $sql;
$result = mysqli_query($con, $sql);
$result2 = mysqli_query($con,$sql2);
$result3 = mysqli_query($con, $sql3);
$result4 = mysqli_query($con,$sql4);
$result5 = mysqli_query($con,$sql5);
$result6 = mysqli_query($con,$sql6);

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
	echo json_encode($file_location);
  }

$con->close();


?>

