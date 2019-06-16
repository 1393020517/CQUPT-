<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 19:16
 * Function: 删除不合格的图片
 * Conclusion: 去掉header，因为一个页面只返回一个就行，另外要更改sql语句的格式‘“. .”’
 */
include_once("conn.php");
$path0 = $_POST['src'];
$words = $_POST['word'];   //待确认
$flag = 1;    //记录反馈是否成功
//echo $path0
if ($path0 == "http://127.0.0.1/photosbasement2/cqupt0.9/manager/img/test.png" or $path0 == "http://127.0.0.1/photosbasement2/cqupt0.9/manager/examine.html") {     //待修改
    echo json_encode(["status" => "default"]);
} else {
    preg_match('#tempfile/.+.jpg$#', $path0, $matches);
    $path = './' . $matches[0];
    if (isset($words)) {      //有反馈
        $com_res = mysqli_query($a, "SELECT ID AND label FROM tempphotos WHERE paths='" . $path . "'");
        $arr = $com_res->fetch_assoc();
        $label = $arr['label'];
        $ID = $arr['ID'];
        $words = $words . "（抱歉！您上传的标签为：" . $label . "的图片已被图库管理人员删除！）";
        $ensure = mysqli_query($a, "SELECT feedback FROM USERINFO WHERE ID='" . $ID . "'");
        $arr = $ensure->fetch_assoc();
        if ($arr['feedback'] != NULL) {   //反馈非空
            $words = $arr['feedback'] . ',' . $words;
        }
        mysqli_query($a, "UPDATE USERINFO SET feedback='" . $words . "' WHERE ID = '" . $ID . "'");
        $aff = mysqli_affected_rows($a);
        if (!($aff > 0)) {
            $flag = 0;    //写入反馈失败
        }
    }
    $sqlstr = "DELETE FROM tempphotos WHERE paths='" . $path . "'";
    mysqli_query($a, $sqlstr);
    $aff = mysqli_affected_rows($a);
    if ($aff > 0 && $flag) {
        $delete_path = '.' . $path;
        $bool = unlink($delete_path);
        if ($bool) {
            echo json_encode(["status" => true]);
        } else {
            echo json_encode(["status" => false]);   //物理删除图片失败
        }
    } else {
        echo json_encode(["status" => false]);    //数据库删除图片信息或者写入反馈失败
    }
}