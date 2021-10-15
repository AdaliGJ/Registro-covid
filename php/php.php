<?php
header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "employees";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'GET':
  	$emp_no = $_GET['emp_no'];
  	$sql = "select * from employees ".($emp_no?" where emp_no=$emp_no":'')." limit 10";
  	break;
	case 'POST':
  	$emp_no = $_POST["emp_no"];
  	$first_name = $_POST["first_name"];
  	$last_name = $_POST["last_name"];
  	$gender = $_POST["gender"];
 	 
 	 
  	$sql = "insert into employees (emp_no, first_name, last_name, gender, hire_date, birth_date) values ('$emp_no', '$first_name', '$last_name', '$gender', now(), now());";
 	 
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
	$emparray = array();
    	while($row =mysqli_fetch_assoc($result))
    	{
        	$emparray[] = $row;
    	}
    echo json_encode($emparray);
  } elseif ($method == 'POST') {
	echo json_encode($result);
  } else {
	echo mysqli_affected_rows($con);
  }

$con->close();


?>

