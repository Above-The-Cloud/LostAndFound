<?php

/**
*   edit界面后台数据处理；
*   by: wcy；
*   错误处理缺失，图片处理缺失；
*/
include 'conn.php';
$user_id = $_GET['user_id'];
$type = $_GET['type_t'];
$title = $_GET['title'];
$msg = $_GET['msg'];
$ie = $_GET['image_exist'];
$sql = "INSERT INTO publish ".
        "(user_id, type, title, msg, image_exist, submission_time) ".
        "VALUES ".
        "('$user_id','$type','$title','$msg', '$ie', current_date);";
$res = mysqli_query( $conn, $sql );
//echo $user_id, $type, $title, $msg, $ie, $sql;
//echo json_encode($res);

//尝试返回给发布的id
$sql = "SELECT max(publish_id) as max_pid FROM publish WHERE user_id='$user_id';";
$res = mysqli_query( $conn, $sql );
if (mysqli_num_rows($res) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($res)) {
     echo json_encode($row);
    }
}
mysqli_close($conn);

?>