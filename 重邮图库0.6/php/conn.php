<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/1/30
 * Time: 10:57
**/
/*if(!isset($_COOKIE["kkk"])){
    setcookie("kkk",date("y-m-d H:i:s"));
    echo "欢迎";
}else {
    setcookie("kkk", date("y-m-d H:i:s"), time() + 35);
    echo "nimmmmm";
}*/
$a=/*@*/mysqli_connect("localhost","root","","trail") or die("连接数据库服务器失败！".mysqli_error($a));
mysqli_query($a,"set names utf8");