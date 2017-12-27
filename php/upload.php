<?php
include 'conn.php';
    error_log("FILES:" . json_encode($_FILES) . "\r\n", 3, "./logs/info.log");
    error_log("POST: " . json_encode($_POST) . "\r\n", 3, "./logs/info.log");
    error_log("publish_id: " . $_POST["publish_id"] . "\r\n", 3, "./logs/info.log");
    
$publish_id = $_GET['publish_id'];
$sql = "UPDATE publish SET image_exist=1 WHERE publish_id='$publish_id';"
$res = mysqli_query( $conn, $sql );

echo json_encode(res);



mysqli_close($conn);
?>