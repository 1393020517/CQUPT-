<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2019/2/18
 * Time: 11:03
 * function: 收藏上传图片和标签
 */
//session_start();
header("Content-type: text/html; charset=GB2312");
include_once("conn.php");
//    $id = $_SESSION['user_account'];
    $id=$_POST["id"];
    $image=$_POST['image'];
    $label = $_POST["title"];
    $picture_name = $_POST["file_name"];
    if(strstr($picture_name, '.') != '.jpg'){
        echo json_encode(["status"=>false]);    //图片格式不正确
    }
    else {
        $arr=explode(".",$picture_name);
        $picture_name=$arr[0];
        $imageName = "Estation-" . $picture_name . date("His", time()) . "--" . rand(1111, 9999) . '.jpg';
        if (strstr($image, ",")) {
            $image = explode(',', $image);
            $image = $image[1];
        }
        date_default_timezone_set("Asia/Chongqing");
        $path = "../file" ;//. date("YmdHis", time());
//        if (!is_dir($path)) { //判断目录是否存在 不存在就创建
//            mkdir($path, 0777, true);
//        }
        $imageSrc = $path . "/" . $imageName;
        $r = file_put_contents($imageSrc, base64_decode($image));
        if (!$r) {
            echo json_encode(["status" => false]);     //上传不成功
        } else {
            //echo json_encode(["status" => true]);
            $sqlstr3 = "INSERT INTO photos(paths) VALUES('$imageSrc')";
            $extract2 = mysqli_query($a,"SELECT saved FROM USERINFO WHERE ID='$id'");
            mysqli_query($a, $sqlstr3);
            $aff=mysqli_affected_rows($a);
            if(!($aff > 0)){
                echo json_encode(["status" => false]);    //插入路径到photos不成功
            }
            else{
                mysqli_query($a,"UPDATE photos SET label='$label' WHERE paths='$imageSrc'");
            if($extract2){      //原来有路径上传
                $arrpath = mysqli_fetch_row($extract2);
                $inpath = implode(",",$arrpath);      //内部路径提取出来并且拼接成字符串
                $outpath = $inpath.','.$imageSrc;
                mysqli_query($a,"UPDATE USERINFO SET saved='$outpath' WHERE ID='$id'");
                if(mysqli_affected_rows($a)>0){
                    echo json_encode(["status" => true]);
                }
                else{
                    echo json_encode(["status" => false]);   //更新个人上传路径失败
                }
            }
            else{    //原来没有过上传
                mysqli_query($a,"UPDATE USERINFO SET saved='$imageSrc'WHERE ID='$id'");
                if(mysqli_affected_rows($a) > 0){
                echo json_encode(["status" => true]);
                }
                else{
                echo json_encode(["status" => false]);    //更新个人上传路径失败
                }
            }
            }
        }
    }
//$sqlstr2 = 'SELECT * FROM USERINFO WHERE ID=$id';
//$result6 = mysqli_query($a, $sqlstr2);
//    $arr = mysqli_fetch_assoc($result6);
//    $user = $arr['username'];    //记录上传人的用户名
//    $files = $_FILES['file_name']['error'];
//    $tack = $_POST["title"];
//    if (!$files) {
//            $picture_name = $_POST["file_name"];
//
//            $picture_name = strstr($picture_name, '.');
//            if ($picture_name == '.jpg' and $_FILES["file_name"]["size"] <= 10240000) {
//                //找到文件存放的位置
//                date_default_timezone_set("Asia/Chongqing");
//                $filename = "./file/" . date("YmdHis") . $_FILES["file_name"]["name"];
//                //转换编码格式
//                $filename = iconv("UTF-8", "gb2312", $filename);
//                //判断文件是否存在
//                if (file_exists($filename)) {
//                    echo "该文件已存在！";
//                } else {
//                    //保存文件
//                    move_uploaded_file($_FILES["file_name"]["tmp_name"], $filename);
//                    $sqlstr3 = "INSERT INTO photos(paths) VALUES('$filename')";
//                    $sqlstr4 = "INSERT INTO USERINFO(saved) VALUES('$filename') WHERE ID='$id'";
//                    mysqli_query($a, $sqlstr3);
//                    mysqli_query($a, $sqlstr4);
//                    $aff=mysqli_affected_rows($a);
//                    if($aff !=0 ){
//                        echo json_encode(["status" => true]);
//                        $extract = mysqli_query($a, "SELECT label FROM photos WHERE paths='$filename'");
//                        $arrtack = mysqli_fetch_row($extract);
//                        $intack = implode(",",$arrtack);
//                        $outtack = implode(",",$tack);
//                        mysqli_query($a, "UPDATE photos SET label= ''$outtack'.','.'$intack'' WHERE paths='$filename'");
//                    }
//                    else{
//                        echo json_encode(["status" => false]);
//                    }
//                }
//            }
//    } else if ($files == 1 or $files == 2) {
//        echo json_encode(["status" => false]);   //待填写，跳转到提交页面
//    } else if ($files == 3 or $files == 4 or $files == 6 or $files == 7) {
//        echo json_encode(["status" => false]);   //待填写，跳转到提交页面
//    }
//}
//session_destroy();