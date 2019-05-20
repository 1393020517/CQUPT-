

/*********cookie******************/
function setCookie(c_name,value,expireseconds){
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireseconds * 1000);
    document.cookie=c_name+ "=" +escape(value)+
        ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start, c_end));
        }
    }

    return "";
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


/***cookie********/




// 页面加载
window.onload=function () {
    var username=getCookie('cookie_name');
        if (username!=='') {
            document.getElementById('login').style.display="none";
        }
    var url=window.location.href;
    var datas = url.match(/\?key=(.*)/)[1];

    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:1,
            title:datas
        },
        success:function (data) {
            var sort_pics=document.getElementsByClassName('sort_pics');

            for(i=0;i<sort_pics.length;i++){
                var sort_pic =sort_pics[i];
                sort_pic.src=data[i].src
            }
            var sort_title=document.getElementsByClassName('sort_title');
            for(i=0;i<sort_title.length;i++){
                var sorttitle=sort_title[i];
                sorttitle.innerHTML=data[i].title
            }

        },
        error:function () {
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
}



/*登录*/

var turn = document.getElementById('login_btn');

turn.onclick=function() {

    var username=document.getElementById("user").value;
    var userpwd=document.getElementById("pwd").value;
    if(username === "") {
        layer.msg('学号不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );

        return false;
    }

    if(userpwd === "") {
        layer.msg('密码不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );

        return false;
    }
    else {
        $.ajax({

            url:"./php/index1.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                id:username,
                pwd:userpwd
            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if(data.status==='logged'){
                    location = "./user.html"/*待修改*/
                }
                else if (data.status) {/*indexOf("true")>-1*/
                    document.getElementById('login').style.display="none";
                    document.getElementById('user_page').style.display="";
                    setCookie('cookie_name',username,3600*2);
                    location = "./result.html?id="+username/*待修改*/


                    /*登陆后进入个人页面*/
                    // $('#displaysign1').attr('href','./user.html?id='+username);
                    var displaysign=document.getElementById('user_page');
                    displaysign.onclick=function () {
                        var user_id=document.getElementById('user').value;
                        window.location.href ="./user.html?id="+user_id

                    };
                }
                else {
                    document.getElementById('signform').style.display="none";

                    layer.msg('验证失败请重新登录', {
                        icon: 2,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, );
                }

                /*用户个人地址*/
            },
            error:function(){
                document.getElementById('signform').style.display="none";
                layer.open({
                    type: 1
                    ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                    ,btn: '关闭'
                    ,offset: '100px'
                    ,btnAlign: 'c' //按钮居中
                    ,area: ['220px', ]
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        })
    }

};









/*登录框*/
$(function ()
{
    $('.change a').click(function ()
    {
        $('.signform').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
    });
});

function start() {
    document.getElementById('signform').style.display=""
}

function signclose() {
    document.getElementById('signform').style.display="none";
    document.getElementById('registerform').style.display="none"
}
/*登录框*/






/*分页*/
layui.use('laypage', function(){
    var laypage = layui.laypage;
    var url=window.location.href;
    var datas = url.match(/\?key=(.*)/)[1];
    //执行一个laypage实例
    laypage.render({
        elem: 'result_page' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: 50 //数据总数，从服务端得到
        ,layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip']
        ,theme: '#1E9FFF'
        ,jump: function(obj, first){
            //得到当前页，以便向服务端请求对应页的数据。
            $.ajax({
                url:"./Php/gettemp.php",/*待修改*/
                type:"POST",
                dataType:"json",
                data:{
                    page:obj.curr,
                    title:datas
                },
                success:function (data) {
                    var sort_pics=document.getElementsByClassName('sort_pics');

                    for(i=0;i<sort_pics.length;i++){
                        var sort_pic =sort_pics[i];
                        sort_pic.src=data[i].src
                    }
                    var sort_title=document.getElementsByClassName('sort_title');
                    for(i=0;i<sort_title.length;i++){
                        var sorttitle=sort_title[i];
                        sorttitle.innerHTML=data[i].title
                    }

                },
                error:function () {
                    layer.open({
                        type: 1
                        ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                        ,btn: '关闭'
                        ,offset: '100px'
                        ,btnAlign: 'c' //按钮居中
                        ,area: ['220px', ]
                        ,shade: 0 //不显示遮罩
                        ,yes: function(){
                            layer.closeAll();
                        }
                    });
                }
            })

        }
    });
});
/*分页*/



/*搜索点赞*/

function result_nice(number) {
    var pic=document.getElementById('result_pic'+number).src;
    $.ajax({
        url:"./php/thumb-up.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            zan:pic,

        },
        success:function(data){

            if(data.status){
                document.getElementById('result_nice'+number).style.display="none";
                document.getElementById('result_nice_on-'+number).style.display=""
            }
            else
            {
                if(data.status==='default'){
                    alert('不要赞默认图片哦')
                }
                else{
                    alert('点赞失败')
                }
            }

        },
        error:function(){
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
}


/*搜索点击*/


function result_click(number) {
    var pic=document.getElementById('result_pic'+number).src;
    $.ajax({
        url:"./php/click.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            click:pic,

        },
        success:function(data){
            if(data.status){
                alert('ok')
            }
            else
            {
                if(data.status==='default'){
                    alert('默认图片哦')
                }
                else{
                    alert('点击失败')
                }
            }
        },
        error:function(){
            layer.open({
                type: 1
                ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                ,btn: '关闭'
                ,offset: '100px'
                ,btnAlign: 'c' //按钮居中
                ,area: ['220px', ]
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    })
}



/*搜索收藏*/


function result_collect(number) {
    var cookie=getCookie('cookie_name');
    if (cookie===''){
        layer.msg('请先登录', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
    }
    else{
        var pic=document.getElementById('result_pic'+number).src;
        $.ajax({
            url:"./php/thumb-up.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                cang:pic,

            },
            success:function(data){

                if(data.status){
                    document.getElementById('result_collect'+number).style.display="none";
                    document.getElementById('result_collect_on-'+number).style.display=""
                }
                else
                {
                    if(data.status==='default'){
                        alert('不要赞默认图片哦')
                    }
                    else{
                        alert('点赞失败')
                    }
                }

            },
            error:function(){

                layer.open({
                    type: 1
                    ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                    ,btn: '关闭'
                    ,offset: '100px'
                    ,btnAlign: 'c' //按钮居中
                    ,area: ['220px', ]
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        })
    }

}



/*忘记密码*/


var changepwd = document.getElementById('to_email');


changepwd.onclick =function() {
    var email = document.getElementById("email").value;
    var user_name = document.getElementById("user_name").value;
    var preg =new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

    if (user_name ===''){
        layer.msg('学号不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(email === '' ||!preg.test(email)){
        layer.msg('请填写正确的邮箱', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    else {
        $.ajax({
            url:"./php/index2.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                id:user_name,
                email:email,
            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if (data.status/*indexOf("true")>-1*/) {
                    document.getElementById('registerform').style.display="none";
                    layer.msg('发送成功', {
                        icon: 1,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, );
                    /*待修改*/
                }
                else {
                    document.getElementById('registerform').style.display="none";

                    layer.msg('验证失败请重新登录', {
                        icon: 2,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, );
                }

                /*用户个人地址*/
            },
            error:function(){
                document.getElementById('registerform').style.display="none";
                layer.open({
                    type: 1
                    ,content: '<div style="width: 100px;height: 50px;margin: 0 auto;padding-top: 30px">'+ '无法连接服务器' +'</div>'
                    ,btn: '关闭'
                    ,offset: '100px'
                    ,btnAlign: 'c' //按钮居中
                    ,area: ['220px', ]
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });

            }
        })
    }


};