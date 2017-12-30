<?php
include 'conn.php';
//echo json_encode($_FILES);
//echo json_encode($_POST);  
$newname = " ";
$publish_id = $_POST['publish_id'];
$sql = "UPDATE publish SET image_exist=1 WHERE publish_id='$publish_id';";
$res = mysqli_query( $conn, $sql );

//echo json_encode($res);
if ($_FILES["file"]["error"] > 0)
 {
    echo json_encode($_FILES["file"]["error"]);
 }
else
{
  $temp = explode(".", $_FILES["file"]["name"]);
  $extension = end($temp); 
  move_uploaded_file($_FILES["file"]["tmp_name"], "image/". $_FILES["file"]["name"]);
  $newname = "image/".date("Y").date("m").date("d").date("H").date("i").date("s").rand(100, 999).".".$extension;
  rename("image/" . $_FILES["file"]["name"], $newname);
}

$sql = "INSERT INTO image(publish_id, type, image_url, submission_time) ".
      "VALUES ".
      "('$publish_id', '$extension', '$newname', current_date);";
$res = mysqli_query( $conn, $sql );
//echo json_encode($res);
mysqli_close($conn);
?>