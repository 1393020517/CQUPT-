<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/20
 * Time: 23:04
 * Function: Delete formal photos
 */
include_once("conn.php");
$words = $_POST['word'];  //待确认
$path0 = $_POST['src'];    //此时得到的路径是html的相对路径为：./tempfile/xxx.jpg
$flag = 1;     //记录反馈是否成功
$flag2 =1;    //记录用户收藏记录是否成功
if ($path0 == "http://127.0.0.1/photosbasement2/cqupt0.9/manager/img/test.png") {
    echo json_encode(["status" => "default"]);
} else {
    preg_match('#file/.+.jpg$#', $path0, $matches);
    $path = './' . $matches[0];
    //删除掉用户的上传信息
    $result = mysqli_query($a, "SELECT label AND ID AND `added-to` FROM photos WHERE paths = '" . $path . "'");
    $info_arr = $result->fetch_assoc();
    $id = $info_arr['ID'];
    $label = $info_arr['label'];
    $words = $words . "（抱歉！您上传的标签为：" . $label . "的图片已被图库管理人员删除！）";
    $res = mysqli_query($a, "SELECT feedback AND uploading FROM USERINFO WHERE id='" . $id . "'");
    $content = $res->fetch_assoc();
    if ($content['feedback'] != NULL) {   //反馈非空
        $words = $content['feedback'] . ',' . $words;
    }
    mysqli_query($a, "UPDATE USERINFO SET feedback='" . $words . "' WHERE ID = '" . $ID . "'");
    $aff = mysqli_affected_rows($a);
    if (!($aff > 0)) {
        $flag = 0;    //写入反馈失败
    }
    //-------------收藏过此图片的用户的收藏信息删除
    if($info_arr['added-to'] != NULL) {   //有用户收藏过
        $adduser = $info_arr['added-to'];
        $user_arr = explode(",", $adduser);
        foreach ($user_arr as $item) {
            $result2 = mysqli_query($a, "SELECT favorite FROM USERINFO WHERE ID='" . $item . "'");
            $fav_arr2 = $result->fetch_assoc();
            $fav = $fav_arr2['favorite'];
            $fav_temp_arr = explode(",", $fav);
            $temp = [];
            foreach ($fav_temp_arr as $item2) {
                if ($item2 != $path) {
                    $temp[] = $item2;
                }
            }
            $new_fav = implode(",", $temp);
            mysqli_query($a, "UPDATE USERINFO SET favorite='" . $new_fav . "' WHERE ID='" . $item . "'");
            $aff3 = mysqli_affected_rows($a);
            if (!($aff3 > 0)) {
                $flag2 = 0;
            }
        }
    }
    //-------------
    $uploading = $content['uploading'];
    $arr = explode(",", $uploading);
    $newarr = [];
    for ($i = 0; $i < count($arr); $i++) {
        if ($path != $arr[$i]) {   //不是要删除的对象，就用新数组去装
            $newarr[] = $arr[$i];
        }
    }
    $newpath = implode(",", $newarr);
    mysqli_query($a, "UPDATE USERINFO SET uploading='" . $newpath . "' WHERE ID ='" . $id . "'");
    $aff1 = mysqli_affected_rows($a);
    if ($aff1 > 0 && $flag && $flag2) {
        $sqlstr = "DELETE FROM photos WHERE paths='" . $path . "'";
        mysqli_query($a, $sqlstr);
        $aff2 = mysqli_affected_rows($a);
        if ($aff2 > 0) {
            $delete_path = '../.' . $path;
            $bool = unlink($delete_path);
            if ($bool)
                echo json_encode(["status" => true]);
            else echo json_encode(["status" => false]);  //物理删除图片失败
        } else echo json_encode(["status" => false]);  //数据库库删除图片信息失败
    } else {
        echo json_encode(["status" => false]);    //更新信息或者写入反馈失败或者删除用户收藏记录失败
    }
}