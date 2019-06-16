<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/18
 * Time: 23:46
 */
include_once("conn.php");
const NUM_PAGE = 20;   //定义常量
$page = $_POST['page'];
$str = "SELECT ID FROM USERINFO";
$result = mysqli_query($a, $str);
$aff = mysqli_affected_rows($a);
if ($aff > 0) {   //有上传记录
    $new_arr = [];
    while ($resarr = mysqli_fetch_row($result)) {
        $new_arr[] = $resarr[0];
    }
    $rows = [];
    for ($i = ($page-1)*NUM_PAGE ; $i < $page*NUM_PAGE; $i++) {
        if($i<count($new_arr)) {
            $result1 = mysqli_query($a, "SELECT username, password FROM USERINFO WHERE ID='" . $new_arr[$i] . "'");
            $arr = mysqli_fetch_assoc($result1);
            $id = $new_arr[$i];
            $user = $arr['username'];
            $pwd= $arr['password'];
            $rows[] = array('id' => $id, 'name2' => $user,'pwd' => $pwd);
        }
        else{        //没有就传空元素
            $rows[] = array('id' => "", 'name2' => "",'pwd' => "");
        }
    }
//    var_dump($rows);
    echo json_encode($rows);
}
else {   //没有未审核的记录
    echo json_encode(["status" => false]);
}