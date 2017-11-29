<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lostandfound";
// 创建连接
$conn = mysqli_connect($servername, $username, $password,$dbname);
   //传入的数据
$nick_name=$_GET['name'];
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "连接成功"."<br>";
$sql="SELECT * FROM user_info ";
$res = mysqli_query($conn, $sql);
if (mysqli_num_rows($res) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($res)) {
        echo "nick_name: " . $row["nick_name"]. " - user_id: " . $row["user_id"]. " " .  "<br>";
    }
} else {
    echo "0 结果";
}
 
mysqli_close($conn);

// $res = json_encode($res);
// exit($res);
?>