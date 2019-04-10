// /*页面加载*/

function examine() {
    document.getElementById('user').style.display="none";
    document.getElementById('picture').style.display="none";
    document.getElementById('examine').style.display="";

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
          alert('成功通过')/*test*/
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

/*****************图片管理*****************************/
function picture() {
    document.getElementById('user').style.display="none";
    document.getElementById('examine').style.display="none";
    document.getElementById('picture').style.display="";




}

function locate(name) {
    datas=name;

    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:1,
            title:datas
        },
        success:function (data) {
            window.location.href ="./examine.html?key="+datas;/**examine修改名字时注意***/
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('picture'+i);
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



/*转到某页*/
function picnextpage(number) {
    var url=window.location.href;
    var name = url.match(/\?key=(.*)/)[1];
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number,
            title:name
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var pic=document.getElementById('picture'+i);
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
    var src=document.getElementById('picture'+number).src
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


/**用户***/
function user() {
    document.getElementById('examine').style.display="none";
    document.getElementById('picture').style.display="none";
    document.getElementById('user').style.display="";
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:1,
        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var id=document.getElementById('id'+i);
                id.innerText=data[i].id[0]
            }

            for(i=0;i<data.length;i++){

                var name1=document.getElementById('name1_'+i);
                name1.innerHTML=data[i].name1[0]
            }
            for(i=0;i<data.length;i++){

                var name2=document.getElementById('name2_'+i);
                name2.innerHTML=data[i].name2[0]
            }
            for(i=0;i<data.length;i++){
                var pwd=document.getElementById('pwd'+i);
                pwd.innerText=data[i].pwd[0]
            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
};




function usernextpage(number) {
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number,

        },
        success:function (data) {
            for(i=0;i<data.length;i++){
                var id=document.getElementById('id'+i);
                id.innerText=data[i].id[0]
            }

            for(i=0;i<data.length;i++){

                var name1=document.getElementById('name1_'+i);
                name1.innerHTML=data[i].name1[0]
            }
            for(i=0;i<data.length;i++){

                var name2=document.getElementById('name2_'+i);
                name2.innerHTML=data[i].name2[0]
            }
            for(i=0;i<data.length;i++){
                var pwd=document.getElementById('pwd'+i);
                pwd.innerText=data[i].pwd[0]
            }
        },
        error:function () {
            alert('无法连接服务器')
        }
    })
}
