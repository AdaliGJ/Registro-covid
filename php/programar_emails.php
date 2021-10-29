<?php
header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "registro_covid";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);




if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

$from = 'registrovacunacovid8@gmail.com';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$subject = 'Recordatorio cita de vacunación';

$headers .= 'From: '.$from."\r\n";
$headers .= 'Reply-To: '.$from."\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();



 $sql = "select c.*, nombre_persona(c.dpi_persona) nombre, DATE(DATE_ADD(NOW(),INTERVAL 7 DAY)) dia from correos c inner join datos_registro d on (d.dpi_persona = c.dpi_persona) where fecha_primera_dosis = DATE(DATE_ADD(NOW(),INTERVAL 7 DAY)) OR fecha_segunda_dosis = DATE(DATE_ADD(NOW(),INTERVAL 7 DAY)) OR fecha_tercera_dosis = DATE(DATE_ADD(NOW(),INTERVAL 7 DAY));";



$result = mysqli_query($con,$sql);


if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

    	while($row =mysqli_fetch_assoc($result))
    	{
		
		$to = $row['correo'];
		$dpi = $row['dpi_persona'];
		$nombre = $row['nombre'];
		$dia = $row['dia'];

		$message = 'Buenos días, ' . $nombre . "\r\n\n"; 
		$message .= 'Se le informa que su usuario con DPI: '. $dpi .' está programado para vacunarse dentro de una semana, el día '. $dia . '.' ."\r\n\n";   
		$message .= 'Puede consultar sus datos en la web de registro.' . "\r\n\n";
		$message .= 'Saludos Cordiales.' . "\r\n\n";
		
		 if(mail($to, $subject, $message, $headers)){
    			echo 'Success.';
    		} else{
    			echo 'Error';
    		}
    	}
    	


$con->close();


?>

