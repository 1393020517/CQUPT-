<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 13:28
 * Function: 管理员登录
 * Add Basement: 创建"manager"：ID,password
 */
header("Content-type: text/html; charset=GB2312");
include_once("conn.php");
$id = $_POST['id'];
$pwd = $_POST['pwd'];
$str="SELECT password FROM manager WHERE ID='".$id."'";
$result=mysqli_query($a,$str);
$arr = mysqli_fetch_assoc($result);
$oripwd = $arr['password'];
if($oripwd == $pwd){
    echo json_encode(["status" => true]);
}
else{
    echo json_encode(["status" => false]);
}