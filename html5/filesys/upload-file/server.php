<?php
define('ROOT', dirname(__FILE__).'/');
$fileToUpload = !empty($_POST['fileToUpload'])?$_POST['fileToUpload']:'';

$filename = $_FILES['fileToUpload']['name'];
move_uploaded_file($_FILES['fileToUpload']['tmp_name'], ROOT.'upload/'.$filename);
// $response = array();

// if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], ROOT.'upload/'.$filename)) {
// 	$response['isSuccess'] = true;
// 	$response['name']      = $name;
// 	$response['gender']    = $gender;
// 	$response['photo']     = $ROOT.'upload/'.$filename;
// } else {
// 	$response['isSuccess'] = false;
// }

// echo json_encode($response);
?>