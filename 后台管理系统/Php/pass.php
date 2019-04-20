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
$label = $_POST['tip'];    //待确认
$id0 = mysqli_query($a, "SELECT ID FROM tempphotos WHERE paths='".$path."'");
$id_arr = mysqli_fetch_assoc($id0);
$id = $id_arr['ID'];
$num = mysqli_num_rows($id0);
if ($num == 0) {
    echo json_encode(["status" => false]);    //未找到用户，可能是path被篡改
} else {
    preg_match('#(?<=/tempfile).+#', $path,$matchers);
//    echo "match:" ;
//    var_dump($matchers);
    $temp_path = '../tempfile'.$matchers[0];
//    echo $temp_path."<br>";
    $newpath = "../../file".$matchers[0];    //调用上两层目录
    $insert_path = "./file".$matchers[0];   //存放地址
//    echo $newpath;
    copy($temp_path,$newpath);
    unlink($temp_path);
    $sqlstr = "INSERT INTO photos(paths,label) VALUES('".$insert_path."','".$label."')";
    $del_res = mysqli_query($a,"");
    mysqli_query($a, $sqlstr);
    $aff = mysqli_affected_rows($a);
    if ($aff > 0) {
        $extract_res = mysqli_query($a, "SELECT saved FROM USERINFO WHERE ID='".$id."'");
        $aff = mysqli_num_rows($extract_res);
        $extract_arr = mysqli_fetch_assoc($extract_res);
        $extract = $extract_arr['saved'];
        if($aff>0){      //原来有路径上传
            $arrpath = mysqli_fetch_row($extract_res);    //只有一条记录，不用循环拿出
            $inpath = implode(",",$arrpath);      //内部路径提取出来并且拼接成字符串
            $outpath = $inpath.','.$insert_path;
            mysqli_query($a,"UPDATE USERINFO SET saved='".$outpath."' WHERE ID='".$id."'");
            if(mysqli_affected_rows($a)>0){
                echo json_encode(["status" => true]);
            }
            else{
                echo json_encode(["status" => false]);   //更新个人上传路径失败
            }
        }
        else{    //原来没有过上传
            mysqli_query($a,"UPDATE USERINFO SET saved='".$insert_path."'WHERE ID='".$id."'");
            if(mysqli_affected_rows($a) > 0){
                echo json_encode(["status" => true]);
            }
            else{
                echo json_encode(["status" => false]);    //更新个人上传路径失败
            }
        }
    } else {
        echo json_encode(["status" => false]);
    }
}