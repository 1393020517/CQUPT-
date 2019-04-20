<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 12:37
 * Function: 返回临时图片
 * Unfinished: 返回临时图片的用户id
 */
header("Content-type: text/html;charset = utf-8");
include_once("conn.php");
const NUM_PAGE = 20;   //定义常量
$page = $_POST['page'];
$str = "SELECT paths FROM tempphotos";
$result = mysqli_query($a, $str);
$aff = mysqli_affected_rows($a);
if ($aff > 0) {   //有上传记录
    $new_arr = [];
    while ($resarr = mysqli_fetch_row($result)) {
        $new_arr[] = $resarr[0];
    }
    $rows = [];
    for ($i = ($page-1)*NUM_PAGE ; $i < $page*NUM_PAGE; $i++) {
        if($i<count($new_arr)) {     //如果还有图就传图
            $result1 = mysqli_query($a, "SELECT label FROM tempphotos WHERE paths='" . $new_arr[$i] . "'");
            $arr = mysqli_fetch_assoc($result1);
            $label = $arr['label'];
            $rows[] = array('title' => $label, 'src' => $new_arr[$i]);
        }
        else{        //没有就传空元素
            $rows[] = array('title' => "", 'src' => "");
        }
    }
//    var_dump($rows);
    echo json_encode($rows);
}
else {   //没有未审核的记录
    echo json_encode(["status" => false]);
}