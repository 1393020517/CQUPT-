<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/23
 * Time: 12:16
 * function: 修改用户名
 */
session_start();
header("Content-type: text/html; charset=GB2312");
//if(!(isset($_SESSION['user_account']))){
//    echo json_encode(["status" => "unlogged"]);
//}
//else {
    include_once("conn.php");
    $id = $_POST['id2'];
    $olduser = $_POST['olduser'];
    $newuser = $_POST['newuser'];
    $analyse = "SELECT * FROM USERINFO WHERE username='$newuser'";
    $sqlanalyse = mysqli_query($a, $analyse);
    $sqlanalyse2 = mysqli_query($a, "SELECT * FROM USERINFO WHERE username='$olduser'");
    if(mysqli_num_rows($sqlanalyse2) == 0){      //没找到原用户名
        echo json_encode(["status" => "unfound"]);
    }
    else if (mysqli_num_rows($sqlanalyse) == 0) {       //未找到已有用户名和新用户名重的
        $sqlstr5 = "UPDATE USERINFO SET username='$newuser' WHERE ID=$id";
        $result4 = mysqli_query($a, $sqlstr5);
        $aff2 = mysqli_affected_rows($a);
        if ($aff2 != 0) {
            echo json_encode(["status" => true]);
        } else {
            echo json_encode(["status" => false]);
        }
    }
    else{
        echo json_encode(["status" => false]);    //新输入的用户名重复
    }
//}
session_destroy();