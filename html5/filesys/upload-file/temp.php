<?php
//$name=$_POST['username'];
$dir = $_POST['filename'];
$dir = "uploads/".md5($dir);
file_exists($dir) or mkdir($dir, 0777, true);

$path = $dir."/".$_POST['blobname'];

//print_r($_FILES["file"]);
move_uploaded_file($_FILES["file"]["tmp_name"], $path);

if (isset($_POST['lastone'])) {
	echo $_POST['lastone'];
	$count = $_POST['lastone'];

	$fp = fopen($_POST['filename'], "abw");
	for ($i = 0; $i <= $count; $i++) {
		$handle = fopen($dir."/".$i, "rb");
		fwrite($fp, fread($handle, filesize($dir."/".$i)));
		fclose($handle);
	}
	fclose($fp);
}

?>