
<?php

$type = $_POST["type"];
$title = $_POST["title"];
$msg = $_POST["msg"];
$user_id = 10152150127;
$image_url = '';
$publish_id = 0;
$image_id = 0;
$image_exist = 0;

// 允许上传的图片后缀
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
echo $_FILES["file"]["size"];
$extension = end($temp);     // 获取文件后缀名
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
//&& ($_FILES["file"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension, $allowedExts))
{
    if ($_FILES["file"]["error"] > 0)
    {
        echo "错误：: " . $_FILES["file"]["error"] . "<br>";
    }
    else
    {
        echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
        echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
        echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
        echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"] . "<br>";
        
        $image_exist = 1;
        // 判断当期目录下的 upload 目录是否存在该文件
        // 如果没有 upload 目录，你需要创建它，upload 目录权限为 777
        if (file_exists("upload/" . $_FILES["file"]["name"]))
        {
            echo $_FILES["file"]["name"] . " 文件已经存在。 ";
        }
        else
        {
            // 如果 upload 目录不存在该文件则将文件上传到 upload 目录下
            move_uploaded_file($_FILES["file"]["tmp_name"], "image/" . $_FILES["file"]["name"]);
            echo "文件存储在: " . "image/" . $_FILES["file"]["name"];
        }
    }
}
else
{
    echo "非法的文件格式";
}

include('./conn.php');
$submission_time = date("Y-m-d h:m:s");
$sql = "INSERT INTO publish".
        "(user_id, type, title, msg, image_exist, submission_time)".
        "VALUES".
        "('$user_id', '$type', '$title', '$msg', '$image_exist','$submission_time');";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('publish无法插入数据: ' . mysqli_error($conn));
}
echo "publish数据插入成功\n","<br>";



//将图片链接保存至数据库
if($image_exist)
{
    $sql = "SELECT max(publish_id)  FROM publish WHERE user_id=$user_id;";
    $res = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($res);
    $publish_id = $row[0];
    $oldname = "image/" . $_FILES["file"]["name"];
    $new_name = "image/" . $publish_id . "." . $extension;
    rename($oldname, $new_name);
    $submission_time = date("Y-m-d h:m:s");
    $sql = "INSERT INTO image ".
        "(publish_id, type, image_url, submission_time)".
        "VALUES(1, '$extension', '$new_name', '$submission_time')";
    $retval = mysqli_query( $conn, $sql );
    if(! $retval )
    {
        die('image无法插入数据: ' . mysqli_error($conn));
    }
        echo "image数据插入成功\n","<br>";
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

mysqli_close($conn);
?>
