







var changepwd = document.getElementById('changepwd');


changepwd.onclick =function() {
    var email = document.getElementById("email").value;
    var registername = document.getElementById("user_name").value;
    var pwd =document.getElementById("pwd").value;
    var new_pwd =document.getElementById("new_pwd").value;
    if (registername ===''){
        layer.msg('学号不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(pwd === ''){
        layer.msg('密码不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(new_pwd === ''){
        layer.msg('请重复输入密码', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(email === ''){
        layer.msg('邮箱不能为空', {
            icon: 2,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, );
        return false;
    }
    if(pwd !== new_pwd) {
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
                email:email,
                id:registername,
                newpwd:formpwd,

            },
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if (data.status/*indexOf("true")>-1*/) {
                    document.getElementById('signform').style.display="none";
                    document.getElementById('ok').style.display="";
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



var go=document.getElementById('gotoindex');
go.onclick=function () {
    window.location.href ="./index.html"
}