<?php
define('ROOT', dirname(__FILE__).'/');
$name   = !empty($_POST['name'])?$_POST['name']:'';
$gender = !empty($_POST['gender'])?$_POST['gender']:'';

$filename = time().substr($_FILES['photo']['name'], strrpos($_FILES['photo']['name'], '.'));

$response = array();

if (move_uploaded_file($_FILES['photo']['tmp_name'], ROOT.'upload/'.$filename)) {
	$response['isSuccess'] = true;
	$response['name']      = $name;
	$response['gender']    = $gender;
	$response['photo']     = $ROOT.'upload/'.$filename;
} else {
	$response['isSuccess'] = false;
}

echo json_encode($response);
?>