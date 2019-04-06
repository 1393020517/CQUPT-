var url=window.location.href;
var datas = url.match(/\?key=(.*)/)[1];





window.onload=function () {
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:1,
            title:datas
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('pic'+i);
                pic.src=data[i].src[0]
            }

            for(i=0;i<data.length;i++){

                var click=document.getElementById('click'+i);
                click.innerHTML='点击量'+data[i].tip[0]
            }
            for(i=0;i<data.length;i++){

                var zan=document.getElementById('zan'+i);
                zan.innerHTML='点赞量'+data[i].tip[0]
            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
};



/*转到某页*/
function nextpage(number) {
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number,
            title:datas
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('pic'+i);
                pic.src=data[i].src[0]
            }

            for(i=0;i<data.length;i++){

                var click=document.getElementById('click'+i);
                click.innerHTML='点击量'+data[i].tip[0]
            }
            for(i=0;i<data.length;i++){

                var zan=document.getElementById('zan'+i);
                zan.innerHTML='点赞量'+data[i].tip[0]
            }

        },
        error:function () {
            alert('无法连接服务器')
        }
    })
}


function del(number) {
    var src=document.getElementById('pic'+number).src
    document.getElementById('li'+number).style.display="none";
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number,
            src:src
        },
        success:function (data) {
        if (data.status) {
            alert('删除成功')
        }
        else {
            alert('删除失败')
        }

        },
        error:function () {
            alert('无法连接服务器')
        }
    })

}