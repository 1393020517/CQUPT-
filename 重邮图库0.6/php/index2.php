<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/17
 * Time: 9:51
 * Function: 修改密码
 */
session_start();
header("Content-type: text/html; charset=GB2312");
include_once("conn.php");
$oldpwd = $_POST["oldpwd"];
$newpwd = $_POST["newpwd"];
$id = $_POST["id"];
    $orisql = "SELECT password FROM USERINFO WHERE ID=$id";
    $oriresult = mysqli_query($a, $orisql);
    $oripwd = mysqli_fetch_assoc($oriresult);
    if ($oripwd['password'] == $oldpwd) {      //判断原密码是否和现在的密码相同
        $sqlstr1 = "UPDATE USERINFO SET password='$newpwd' WHERE ID='$id'";      //待确认ID
        $result3 = mysqli_query($a, $sqlstr1);
        $aff = mysqli_affected_rows($a);
        if ($aff>0) {
            //echo "<script>alert('修改成功！');parent.location.herf='../index.html';</script>";
            echo json_encode(["status" => true]);
        } else {
            //echo "<script>alert('修改失败！');parent.location.herf='../main page.html';</script>";
            echo json_encode(["status" => false]);
        }
        /* class interaction{
             public function displayEvents(){
                 echo json_encode('true');         //修改成功
             }
         }
         $display=new interaction();
         $display ->displayEvents();
     } else {      这里有个if的反括号
         class interaction{
             public function displayEvents(){
                 echo json_encode('false');         //修改失败
             }
         }
         $display=new interaction();
         $display ->displayEvents();
     }
     }*/
    }else {
    echo json_encode(["status" => false]);     //待完善
}
session_destroy();