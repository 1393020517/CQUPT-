


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



window.onload=function () {

   var cookie=getCookie('cookie_name');
if(cookie!=='' ){
       document.getElementById('login').style.display="none";
       document.getElementById('user_page').style.display="";
       var displaysign=document.getElementById('user_page');
       displaysign.onclick=function () {

           window.location.href ="./user.html"

       };
   }
};



/*页面跳转*/

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
                    location = "./idnex.html";


                    /*登陆后进入个人页面*/
                    // $('#displaysign1').attr('href','./user.html?id='+username);
                    // var displaysign=document.getElementById('user_page');
                    // displaysign.onclick=function () {
                    //     var user_id=document.getElementById('user').value;
                    //     window.location.href ="./user.html?id="+user_id
                    //
                    // };
                }
                else {
                    document.getElementById('signform').style.display="none";

                    alert('验证失败请重新登录')
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
        layer.msg('请填写正确的邮箱！', {
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