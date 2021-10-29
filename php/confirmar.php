<?php
header('Access-Control-Allow-Origin: *');



$method = $_SERVER['REQUEST_METHOD'];



$subject = 'Confirmación Registro de Vacunación';


switch ($method) {
	

	case 'POST':
	$dpi=$_POST['dpi'];
	$nombre=$_POST['nombre'];
	$centro = $_POST['centro'];
	$from = 'registrovacunacovid8@gmail.com';
	$to = $_POST['email1'];
	$to2 = $_POST['email2'];
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
 
	
	$headers .= 'From: '.$from."\r\n";
    	$headers .= 'Reply-To: '.$from."\r\n";
    	$headers .= 'X-Mailer: PHP/' . phpversion();


	$message = 'Hola, ' . $nombre . "\r\n\n"; 
	$message .= 'Se le informa que su usuario con DPI: '. $dpi .' fue inscrito correctamente en el sistema de vacunación'. "\r\n\n";   
	$message .= 'Su centro de vacunación corresponde al número: ' . $centro . "\r\n\n";
	$message .= 'Saludos Cordiales.' . "\r\n\n";
		 
	
	break;
}



if ($method == 'POST') {
	
    if(mail($to, $subject, $message, $headers)){
    	echo 'Success.';
    } else{
    	echo 'Error';
    }

   if($to2!=''){
	 if(mail($to2, $subject, $message, $headers)){
    		echo 'Success.';
    	} else{
    		echo 'Error';
    	}
   }	

  } else {
	echo mysqli_affected_rows($con);
  }



?>

