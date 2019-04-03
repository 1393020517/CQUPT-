<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/16
 * Time: 18:59
 * Function: 登录检验   登录都用id
 * dbname=photos
 */
header("Access-Control-Allow-Origin: *");
session_start();
header("content-type: text/html; charset=utf-8");
if(isset($_SESSION['user_account'])){
    echo json_encode(["status"=> "logged"]);    //已经登录就直接跳转
}
else {
    include_once("conn.php");
    include_once("obtain.php");
    $_SESSION['user_account'] = $id;
    if ($id != "" and $pwd != "") {
        $result1 = mysqli_query($a, "SELECT * FROM USERINFO WHERE ID=$id");
        $result2 = mysqli_query($a, "SELECT password FROM USERINFO WHERE ID=$id");   //获取指定密码
        $nums1 = mysqli_num_rows($result1);
        $arrpwd = mysqli_fetch_assoc($result2);
        if ($nums1 == 0 or strcmp($pwd, $arrpwd["password"]) != 0) {
            //echo "<script>alert('抱歉！账号或密码错误');parent.location.href='../main page.html';</script>";
            echo json_encode(["status" => false]);
        } else {
            //echo "<script>parent.location.href='../user page.html';</script>";
            //echo json_encode('true');
            echo json_encode(["status" => true]);
        }
        /*class interaction{
            public function displayEvents(){
                echo json_encode('false');         //登录失败
            }
          }
          $display=new interaction();
          $display ->displayEvents();
      } else {
          class interaction{
              public function displayEvents(){
                  echo json_encode('true');         //登录成功
              }
          }
          $display=new interaction();
          $display ->displayEvents();
      }*/
    } else {
        echo "<script>parent.location.href='../main page.html'</script>";
    }
}
session_destroy();