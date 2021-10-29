<?php
header('Access-Control-Allow-Origin: *');



$method = $_SERVER['REQUEST_METHOD'];


$to = 'registrovacunacovid8@gmail.com';
$subject = 'Consulta Página de Contacto';


switch ($method) {
	

	case 'POST':
	$dpi=$_POST['dpi'];
	$nombre=$_POST['nombre'];
	$mensaje = $_POST['mensaje'];
	$from = $_POST['email'];
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	//$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
	
	$headers .= 'From: '.$from."\r\n";
    	$headers .= 'Reply-To: '.$from."\r\n";
    	$headers .= 'X-Mailer: PHP/' . phpversion();

	//$message = '<html><body>';
	$message = 'A Registro de Vacunación'  . "\r\n\n"; 
	$message .= 'Consulta del usuario: '. $nombre . '. Con DPI: '. $dpi . "\r\n\n";   
	$message .= $mensaje . "\r\n\n"; //'</body></html>';
	
		 
	
	break;
}



if ($method == 'POST') {
	
    if(mail($to, $subject, $message, $headers)){
    	echo 'Your mail has been sent successfully.';
    } else{
    	echo 'Unable to send email. Please try again.';
    }
  } else {
	echo mysqli_affected_rows($con);
  }



?>

