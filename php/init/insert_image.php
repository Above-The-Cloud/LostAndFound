<?php  
// 连接数据库  
$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

//连接数据库；
if(! $conn )
{
  die('连接错误: ' . mysqli_error($conn));
}
echo '连接成功<br />';
mysqli_query($conn , "set names utf8");
 
mysqli_select_db($conn, 'lostfound'); 

// 判断action  
$action = isset($_REQUEST['action'])? $_REQUEST['action'] : ''; 
// 上传图片  
if($action=='add'){  
    $image = file_get_contents($_FILES['photo']['name']);  
    $type = $_FILES['photo']['type'];  
    $time = date("Y-m-d h:m:s");
    $sqlstr = "insert into photo(publish_id,type,binarydata,time) values(1, '$type','$image','$time')";  
    $res = mysqli_query($conn, $sqlstr) or die(mysqli_error(res));  
    header('location:insert_image.php');  
    exit();  
// 显示图片  
}elseif($action=='show'){  
    $id = isset($_GET['id'])? intval($_GET['id']) : 0;  
    $sqlstr = "select * from photo where id=$id";  
    $query = mysql_query($sqlstr) or die(mysql_error());  
    $thread = mysql_fetch_assoc($query);  
    if($thread){  
        header('content-type:'.$thread['type']);  
        echo $thread['binarydata'];  
        exit();  
    }  
}else{  
// 显示图片列表及上传表单  
?>  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
 <head>  
  <meta http-equiv="content-type" content="text/html; charset=utf-8">  
  <title> upload image to db demo </title>  
 </head>  
  
 <body>  
  <form name="form1" method="post" action="insert_image.php" enctype="multipart/form-data">  
  <p>图片：<input type="file" name="photo"></p>  
  <p>
    <input type="hidden" name="action" value="add">
    <input type="submit" name="b1" value="提交">
  </p>  
  </form>  
  
<?php  
    $sqlstr = "select * from image order by image_id desc";  
    $query = mysqli_query($conn, $sqlstr) or die(mysqli_error($query));  
    $result = array();  
    while($thread=mysqli_fetch_assoc($query)){  
        $result[] = $thread;  
    }  
    foreach($result as $val){  
        echo '<p><img src="upload_image_todb.php?action=show&id='.$val['id'].'&t='.time().'" width="150"></p>';  
    }  
?> 
</body>  
</html>  
<?php  
}  
?>