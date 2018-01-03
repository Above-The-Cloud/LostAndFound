<?php
/**
*    从数据库抓取数据到index主页
*
*
*/
include 'conn.php';
$data = array();

class Publish 
{
public $publish_id;
public $user_id;
public $type;
public $title;
public $image_exist;
public $submission_time;
public $image_url = array();
}

$sql = "SELECT * FROM publish order by publish_id desc;";

$res = mysqli_query( $conn, $sql );
if (mysqli_num_rows($res) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($res)) {
      $publish =new Publish();
      $publish->publish_id = $row["publish_id"];
      $tmp_id =  $row["publish_id"];
      $publish->user_id = $row["user_id"];
      $publish->type = $row["type"];
      $publish->title = $row["title"];
      $publish->msg = $row["msg"];
      $publish->image_exist = $row["image_exist"];
      $publish->submission_time = $row["submission_time"];
      //$publish->image_url = array();
      $sql_image = "SELECT * FROM image WHERE publish_id= '$tmp_id';";
      $res_image = mysqli_query( $conn, $sql_image );
      if (mysqli_num_rows($res_image) > 0) {
        while($row_image = mysqli_fetch_assoc($res_image)) {
          $publish->image_url[] = $row_image["image_url"];
        }
      }
      $data[]=$publish;

    }
}
$json = json_encode($data);
echo $json;
mysqli_close($conn);
?>
