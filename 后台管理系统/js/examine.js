// /*页面加载*/

window.onload=function () {
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:1
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('pic'+i);
                pic.src=data[i].src[0]
            }

            for(i=0;i<data.length;i++){

                var tip=document.getElementById('tip'+1);
                tip.innerHTML=data[i].tip[0]


            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
};

/*返回通过的*/
function pass_pic(number) {

    document.getElementById('pic'+number).style.display="none";

    var pass_pic=document.getElementById('pic'+number);
    var pass_tip=document.getElementById('tip'+number);
    var src=pass_pic.src;
    var tip=pass_tip.innerHTML;
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            src:src,
            tip:tip

        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('pic'+i);
                pic.src=data[i].src[0]
            }

            for(i=0;i<data.length;i++){

                var tip=document.getElementById('tip'+1);
                tip.innerHTML=data[i].tip[0]


            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
}







/*转到某页*/
function nextpage(number) {
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('pic'+i);
                pic.src=data[i].src[0]
            }

            for(i=0;i<data.length;i++){

                var tip=document.getElementById('tip'+1);
                tip.innerHTML=data[i].tip[0]


            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
}


