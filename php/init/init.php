<?php

/**
* lost and found 本地测试数据库初始化！！！
* 只需运行一次
* 多次运行会删除原有数据库！！！
* 环境：wamp default
* by:汪春雨
*/



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

$retval = mysqli_select_db($conn, 'lostfound' );
if($retval) 
{
	$sql = 'DROP DATABASE lostfound';
	$res = mysqli_query( $conn, $sql );
	if(! $res )
	{
    	die('原始删除数据库失败: ' . mysqli_error($conn));
	}
	echo "原始数据库删除成功\n","<br>";
}

$sql = 'CREATE DATABASE lostfound';
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('创建数据库失败: ' . mysqli_error($conn));
}
echo "数据库 lostfound 创建成功\n","<br>";

mysqli_select_db($conn, 'lostfound' );

//创建表user_info
$sql = "CREATE TABLE user_info( ".
        "user_id BIGINT NOT NULL, ".
        "user_name VARCHAR(100) NOT NULL, ".
        "user_password VARCHAR(40) NOT NULL, ".
        "submission_time DATETIME, ".
        "PRIMARY KEY ( user_id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('数据表创建失败: ' . mysqli_error($conn));
}
echo "数据表 user_info 创建成功\n","<br>";

//插入初始测试数据
$user_id = 10152150127;
$user_password = '123456';
$user_name = '壹汪春雨';
//$submission_time = '2017-12-03 12:00:00';
$submission_time = date("Y-m-d h:m:s");
$sql = "INSERT INTO user_info ".
        "(user_id,user_password, user_name, submission_time) ".
        "VALUES ".
        "('$user_id','$user_password','$user_name', '$submission_time')";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法插入数据: ' . mysqli_error($conn));
}
echo "数据插入成功\n","<br>";


//创建表image

$sql = "CREATE TABLE image (".  
  "image_id INT unsigned NOT NULL auto_increment,".
  "publish_id INT ,".
  "type VARCHAR(100) NOT NULL,".  
  "binarydata mediumblob NOT NULL,".
  "time DATETIME,".  
  "PRIMARY KEY  ( image_id )" .
  ") ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('数据表创建失败: ' . mysqli_error($conn));
}
echo "数据表 image 创建成功\n","<br>";

//插入初始测试数据
//image_fun/image_index.php





//创建表publish
$sql = "CREATE TABLE publish( ".
		"publish_id INT UNSIGNED AUTO_INCREMENT NOT NULL, ".
        "user_id BIGINT NOT NULL, ".
        "type VARCHAR(10), ".
        "title VARCHAR(280) ,".
        "msg VARCHAR(280), ".
        "image_exist INT,".
        //"image_count INT, ".
        "submission_time DATETIME, ".
        "PRIMARY KEY ( publish_id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('数据表 publish 创建失败: ' . mysqli_error($conn));
}
echo "数据表 publish 创建成功\n","<br>";

//publish插入初始测试数据
$submission_time = date("Y-m-d h:m:s");
$sql = "INSERT INTO publish ".
        "(user_id, type, title, msg, image_exist, submission_time) ".
        "VALUES ".
        "('$user_id','lost','寻找校园卡', '校园卡丢了，地标河西食堂，卡号10152150127', 1, '$submission_time')";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('publish无法插入数据: ' . mysqli_error($conn));
}
echo "publish数据插入成功\n","<br>";


//创建表comment
$sql = "CREATE TABLE comment( ".
		"comment_id INT UNSIGNED AUTO_INCREMENT NOT NULL, ".
        "publish_id INT NOT NULL, ".
        "content VARCHAR(280) ,".
        "submission_time DATETIME, ".
        "PRIMARY KEY ( comment_id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('数据表 comment 创建失败: ' . mysqli_error($conn));
}
echo "数据表 comment 创建成功\n","<br>";

//comment插入初始测试数据
$submission_time = date("Y-m-d h:m:s");
$sql = "INSERT INTO comment ".
        "(publish_id, content, submission_time) ".
        "VALUES ".
        "(1, '我捡到了！！！', '$submission_time')";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('comment无法插入数据: ' . mysqli_error($conn));
}
echo "comment 数据插入成功\n","<br>";
mysqli_close($conn);
?>
