<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/17
 * Time: 13:10
 * Function: 返回正式上线的图片
 */
//header("Content-type: text/html;charset = utf-8");
include_once("conn.php");
const NUM_PAGE = 12;   //定义常量
$page = $_POST['page'];
$label = $_POST['title'];
$str = "SELECT paths FROM photos WHERE label = '".$label."'";
$result = mysqli_query($a, $str);
$aff = mysqli_affected_rows($a);
if ($aff > 0) {   //此标签下面有图片
    $new_arr = [];
    while ($resarr = mysqli_fetch_row($result)) {
        $new_arr[] = $resarr[0];
    }
    $rows = [];
    for ($i = ($page-1)*NUM_PAGE ; $i < $page*NUM_PAGE; $i++) {
        if($i<count($new_arr)) {     //如果还有图就传图,防止溢出
            $result1 = mysqli_query($a,"SELECT ID, label, click, `thumb-ups` FROM photos WHERE paths='".$new_arr[$i] ."'");
            $arr = mysqli_fetch_assoc($result1);
            $label = $arr['label'];
            $id = $arr['ID'];
            $click = $arr['click'];
            $thumb = $arr['thumb-ups'];
            $new_path = '.'.$new_arr[$i];   //返回的路径是html文件上一层的file
            $rows[] = array('src' => $new_path,'title' => $label,'click' => $click,'zan' => $thumb);
        }
        else{        //没有就传空元素
            $rows[] = array( 'src' => "",'title' => "",'click' =>"",'zan' => "");
        }
    }
//    var_dump($rows);
    echo json_encode($rows);
}
else {
    $arr =[];
    for($i = ($page-1)*NUM_PAGE ; $i < $page*NUM_PAGE; $i++) {
        $arr[] =array('src'=> "",'title' => "",'click' =>"",'zan' => "");
    }
    echo json_encode($arr);
}