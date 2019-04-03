// $(document).on("click",".like",function(){
//     var dataid=$(this).attr("data-id");
//     var url='3tii.com/test/ajax.php?id='+dataid;
//     $.ajax({
//         url: url,
//         type: 'get',
//         dataType:'json',
//         success: function (data) {
//             $('.zan').html(data.html);
//         }
//     });
// });
//
//
//
//
// $(function(){
//
//     /*建立一个函数*/
//
//     $(".btn").click(function(){
//
//         /*获取到id执行点击事件*/
//
//         if ($(this).attr("data-key")=="on") {
//
//             $(this).addClass("on");
//
//             var num=Number($(this).find("b").html())+1;
//
//             /*给变量赋值当.btn点击执行b标签内容=+1*/
//
//             $(this).find("b").html(num);
//
//             $(this).attr("data-key","")
//
//         }else{
//
//             $(this).removeClass("on");
//
//             var num=Number($(this).find("b").html())-1;
//
//             $(this).attr("data-key","on");
//
//         }
//
//     })
//












//     var Imgbtn1=document.getElementById('zan1');
//
//     Imgbtn1.onclick=function(){
//         document.getElementById('zan1').src="./img/zan2.png";
//     }
// var Imgbtn2=document.getElementById('zan2');
//
// Imgbtn2.onclick=function(){
//     document.getElementById('zan2').src="./img/zan2.png";
// }
// var Imgbtn3=document.getElementById('zan3');
//
// Imgbtn3.onclick=function(){
//     document.getElementById('zan3').src="./img/zan2.png";
// }
// var Imgbtn4=document.getElementById('zan4');
//
// Imgbtn4.onclick=function(){
//     document.getElementById('zan4').src="./img/zan2.png";
// }
// var Imgbtn5=document.getElementById('zan5');
//
// Imgbtn5.onclick=function(){
//     document.getElementById('zan5').src="./img/zan2.png";
// }
// var Imgbtn6=document.getElementById('zan6');
//
// Imgbtn6.onclick=function(){
//     document.getElementById('zan6').src="./img/zan2.png";
// }
// var Imgbtn7=document.getElementById('zan7');
//
// Imgbtn7.onclick=function(){
//     document.getElementById('zan7').src="./img/zan2.png";
// }
// var Imgbtn8=document.getElementById('zan8');
//
// Imgbtn8.onclick=function(){
//     document.getElementById('zan8').src="./img/zan2.png";
// }
// var Imgbtn9=document.getElementById('zan9');
//
// Imgbtn9.onclick=function(){
//     document.getElementById('zan9').src="./img/zan2.png";
// }
// var Imgbtn10=document.getElementById('zan10');
//
// Imgbtn10.onclick=function(){
//     document.getElementById('zan10').src="./img/zan2.png";
// }
// var Imgbtn11=document.getElementById('zan11');
//
// Imgbtn11.onclick=function(){
//     Imgbtn11.src="./img/zan2.png";
// };
// var Imgbtn12=document.getElementById('zan12');
//
// Imgbtn12.onclick=function(){
//     Imgbtn12.src="./img/zan2.png";
// };



//
//
// for (let j=0;j<12;j++){
//     let cang=document.getElementsByClassName('cang');
//     cang[j].onclick=function () {
//         cang[j].src="img/cang2.png";
//
//
//     }
//
//
// }





for (let i=0;i<12;i++){
        let zan=document.getElementsByClassName('zan');
       zan[i].onclick=function () {

           zan[i].src="./img/zan2.png";


       }


    }








// var out = document.getElementsByClassName('zan');
// out.onclick =function() {
//     $.ajax({
//         url:"",
//         type:"POST",
//         dataType:"json",
//         data:{count:count + 1},
//         success:function(data){
//
//         },
//         error:function(data){
//                 alert('点赞失败')
//         }
//     })
// }
//
//
//
