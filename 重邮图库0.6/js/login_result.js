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










/*页面跳转*/





var turn = document.getElementById('denglubutton');
var user=document.getElementById('user');
var pwd=document.getElementById('pwd');

turn.onclick=function() {
    var username=document.getElementById("user").value;
    var userpwd=document.getElementById("pwd").value;
    if(username === "") {
        alert("学号不能为空!");

        return false;
    }

    if(userpwd === "") {
        alert("密码不能为空!");

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

                if (data.status) {
                    var username=data.id;
                    document.getElementById('displaysign').style.display="none";
                    document.getElementById('displaysign1').style.display="";


                    /*登陆后进入个人页面*/
                    // $('#displaysign1').attr('href','./user.html?id='+username);
                    var displaysign=document.getElementById('displaysign1');
                    displaysign.onclick=function () {
                        var user_id=document.getElementById('user').value;
                        window.location.href ="./user.html?id="+user_id

                    };

                }
                else {
                    alert('验证失败请重新登录')
                }

                /*用户个人地址*/
            },
            error:function(){
                alert('无法连接服务器')
            }
        })
    }

};

