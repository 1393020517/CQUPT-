<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/4/10
 * Time: 19:03
 * Function: 审核通过的进入正式库,并保存用户记录
 * Add Database: 在"tempphotos"中添加：ID，paths，label
 */
include_once("conn.php");
$path = $_POST['src'];    //待确认
//echo $path;
if($path == "http://127.0.0.1/photosbasement2/cqupt0.9/manager/examine.html"){
    echo json_encode(["status" => "default"]);
}
else {
    preg_match('#(?<=/tempfile).+#', $path,$matchers);
//    var_dump($matchers);
    $path = './tempfile'.$matchers[0];
$label = $_POST['tip'];    //待确认
$id0 = mysqli_query($a, "SELECT ID FROM tempphotos WHERE paths='".$path."'");
$id_arr = mysqli_fetch_assoc($id0);
$id = $id_arr['ID'];
$num = mysqli_num_rows($id0);
if ($num == 0) {
    echo json_encode(["status" => false]);    //未找到用户，可能是path被篡改
} else {
    $temp_path = "../tempfile".$matchers[0];
    $newpath = "../../file".$matchers[0];    //调用上两层目录
    $insert_path = "./file".$matchers[0];   //存放地址
//    echo $newpath;
    copy($temp_path,$newpath);
    $bool = unlink($temp_path);
    if($bool) {
        mysqli_query($a,"DELETE FROM tempphotos WHERE paths ='".$path."'");   //delete from the temporary photo table
        $sqlstr = "INSERT INTO photos(paths,label) VALUES('" . $insert_path . "','" . $label . "')";
        mysqli_query($a, $sqlstr);
        $aff = mysqli_affected_rows($a);
        if ($aff > 0) {
            $extract_res = mysqli_query($a, "SELECT uploading FROM USERINFO WHERE ID='" . $id . "'");
//            var_dump($extract_res->fetch_assoc());
//            $num = mysqli_num_rows($extract_res);
//            echo $num;      //就算是没有上传路径，num也等于1
            $content = $extract_res->fetch_assoc();
            $cont = $content['uploading'];
            if ($cont != NULL) {      //原来有路径上传
                $outpath = $cont . ',' . $insert_path;
                mysqli_query($a, "UPDATE USERINFO SET uploading='" . $outpath . "' WHERE ID='" . $id . "'");
                if (mysqli_affected_rows($a) > 0) {
;                    echo json_encode(["status" => true]);
                } else {
                    echo json_encode(["status" => false]);   //更新个人上传路径失败
                }
            } else {    //原来没有过上传
                mysqli_query($a, "UPDATE USERINFO SET uploading='" . $insert_path . "'WHERE ID='" . $id . "'");
                if (mysqli_affected_rows($a) > 0) {
                    echo json_encode(["status" => true]);
                } else {
                    echo json_encode(["status" => false]);    //更新个人上传路径失败
                }
            }
        } else {
            echo json_encode(["status" => false]);   //插入失败
        }
    }
    else{
        echo json_encode(["status" => false]);   //删除失败
    }
}
}