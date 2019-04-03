<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/3/17
 * Time: 16:56
 */
date_default_timezone_set("PRC");
$name="name";
$value="xxx";

$expire=mktime()+3600*24;
$path='/';   //cookie的服务器作用路径
$domain='127.0.0.1';  //cookie的域名（待修改）
$secure=false;  //是否通过HTTPS传输
setcookie($name,$value,$expire,$path,$domain,$secure);