

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


//
// window.onload=function () {
//
//     var cookie=getCookie('cookie_name');
//     if(cookie==='' || username!==cookie){
//         location = "./index.html"
//     }
// };




/*改用户名*/
var change_username= document.getElementById('change_btn');

change_username.onclick =function() {
    var username=getCookie('cookie_name');
    var form_username=document.getElementById("form_id").value;
    var user_name=document.getElementById("new_id").value;
    if(form_username === "") {
        layer.msg('原用户名不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(user_name === "") {
        layer.msg('新用户名不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    else {
        $.ajax({
            url:"./php/index3.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                id2:username,
                olduser:form_username,
                newuser:user_name
            },
            success:function(data){

                if (data.status) {/*indexOf("true")>-1*/
                    // location = "./用户界面.html"/*待修改*/
                    layer.msg('修改成功', {
                        icon: 1,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, );
                }
                else if(data.status==='unfound')
                {
                    document.getElementById('signform').style.display="none";
                    layer.msg('找不到原用户名', {
                        icon: 3,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, );
                }
                else {
                    document.getElementById('signform').style.display="none";
                    layer.msg('用户名重复', {
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






/*修改密码*/






var changepwd = document.getElementById('changepwd');
changepwd.onclick =function() {
    var password = document.getElementById("registerpwd").value;
    var repsword = document.getElementById("registerrepwd").value;
    var registername =document.getElementById("registeruser").value;
    var formpwd =document.getElementById("registerformpwd").value;
    if (registername ===''){
        layer.msg('学号不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(password === ''){
        layer.msg('密码不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(formpwd === ''){
        layer.msg('原密码不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(repsword === ''){
        layer.msg('请重新输入密码', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(password !== repsword) {
        document.getElementById('registerpwd').value="";
        document.getElementById('registerrepwd').value="";
        layer.msg('两次密码不同请重新输入', {
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
                id:registername,
                oldpwd:formpwd,
                newpwd:password
            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if (data.status/*indexOf("true")>-1*/) {
                    document.getElementById('registerform').style.display="none";
                    layer.msg('修改成功', {
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