<?php
$conn = mysqli_connect('w.rdc.sae.sina.com.cn：3306', 'kj10kwxnlm', '4wlli1y5zmw3my354l0mxhiikj5z04310ki02j14');
mysqli_select_db($conn,'app_lostfound');
mysqli_query($conn, "SET NAMES UTF-8");
?>