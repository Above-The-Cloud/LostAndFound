<?php
/**
*    从数据库抓取数据到index主页
*
*
*/
include 'conn.php';


$sql = "SELECT * FROM publish;"
$res = mysqli_query( $conn, $sql );

echo json_encode($res);

mysqli_close($conn);
?>