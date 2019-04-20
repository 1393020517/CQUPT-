<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 19:16
 * Function: 删除不合格的图片
 * Conclusion: 去掉header，因为一个页面只返回一个就行，另外要更改sql语句的格式‘“. .”’
 */
include_once ("conn.php");
$path0 = $_POST['src'];    //此时得到的路径是html的相对路径为：./tempfile/xxx.jpg
preg_match('#tempfile/.+.jpg$#', $path0, $matches);
$path = './'.$matches[0];
$sqlstr = "DELETE FROM tempphotos WHERE paths='".$path."'";
mysqli_query($a,$sqlstr);
$aff=mysqli_affected_rows($a);
if($aff > 0){
    $delete_path = '.'.$path;
    unlink($delete_path);
    echo json_encode(["status"=> true]);
}
else{
    echo json_encode(["status" => false]);
}