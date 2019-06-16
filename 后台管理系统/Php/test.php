<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/18
 * Time: 13:16
 */
//include_once ('conn.php');
//$extract_res = mysqli_query($a, "SELECT feedback FROM USERINFO WHERE ID= '2018212454'");
//$content = $extract_res->fetch_assoc();
//$inpath = explode(",", $content['feedback']);
//var_dump($inpath);
//$cont = $content['feedback'];
//if($cont == NULL){
//    echo 'YES';
//}
//else{
//    echo 'NO<br>'.$cont;
//}
//include_once("conn.php");
////$words = $_POST['word'];  //待确认
//$words = "haha";
//$ID = '2018212454';
//if(isset($ID)) {
//    $ensure = mysqli_query($a, "SELECT * FROM USERINFO WHERE uploading='" . $words . "'");
//    $arr = $ensure->fetch_assoc();
//    if ($arr['feedback'] != NULL) {   //反馈非空
//        echo $arr['feedback'];
//    } else {
//        echo 'NO';
//    }
//}
session_start();
$_SESSION['id'] = "KIBE";