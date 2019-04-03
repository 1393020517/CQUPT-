<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/19
 * Time: 16:51
 * function: 搜索功能
 */
//session_start();
header("Content-type: text/html; charset=GB2312");
include_once("conn.php");
$words = $_POST['text'];
    $sqlstr = "SELECT paths FROM photos WHERE label='$words'";
    $result = mysqli_query($a,$sqlstr);
    $row = mysqli_num_rows($result);
    if($row == 0){
        echo json_encode(["status"=>false]);    //未找到标签
    }
    else{
        $arr = mysqli_fetch_row($result);
        for($i=0;$i<count($arr);$i++) {
          echo "$arr[$i]";     //输出路径
        }
}
//if(isset($_POST['save'])&&$_POST['save']!=null){     //收藏功能
//    $arr=$_POST['save'];
//    for($j=0;$j<count($arr);$j++){
//        $result=mysqli_query($a,"INSERT INTO USERINFO(saved) VALUES (','.$arr[$j])");       //userinfo表中一列名为saved保存已经收藏的图
//        $aff=mysqli_affected_rows($a);
//        if($aff){
//            //echo "<script>alert('收藏成功！');parent.location.href='/word/用户界面.html';</script>";
//            echo json_encode('true');
//        }
//        else{
//            //echo "<script>alert('收藏失败！请重试！');parent.location.href='/word/用户界面.html';</script>";
//            echo json_encode('flase');
//        }
//    }
//}
//session_destroy();