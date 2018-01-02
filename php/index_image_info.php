<?php
/**
*    从数据库抓取数据到index主页
*
*
*/
include 'conn.php';
$data = array();

class Image 
{
public $publish_id;
public $image_id;
public $type;
public $image_url;
public $submission_time;

}

$sql = "SELECT * FROM image order by publish_id asc;";
$res = mysqli_query( $conn, $sql );
if (mysqli_num_rows($res) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($res)) {
      $image =new Image();
      $image->publish_id = $row["publish_id"];
      $image->image_id = $row["image_id"];
      $image->type = $row["type"];
      $image->image_url = $row["image_url"];
      $image->submission_time = $row["submission_time"];

      $data[]=$image;

    }
}
$json = json_encode($data);
echo $json;
mysqli_close($conn);
?>
