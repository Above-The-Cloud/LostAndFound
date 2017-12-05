<?php
include('./conn.php');

$image_id     = $_GET['image_id'];
$sql    = "select * from image where image_id='$image_id'";
$result = mysqli_query($conn, $sql);
if (!$result)
    die("读取图片失败！");
$num = mysql_num_rows($result);
if ($num < 1)
    die("暂无图片");
$data = mysql_result($result, 0, 'binarydata');
$type = mysql_result($result, 0, 'type');
$data = base64_decode($data);
mysql_close($image_id);
Header("Content-type: $type");
echo $data;
?>