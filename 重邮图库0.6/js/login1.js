



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






/*修改密码*/






var changepwd = document.getElementById('changepwd');


changepwd.onclick =function() {
    var registername =document.getElementById("registeruser").value;
    var formpwd =document.getElementById("registerformpwd").value;
    var password = document.getElementById("registerpwd").value;
    var repsword = document.getElementById("registerrepwd").value;


    if (registername ===''){
        alert('学号不能为空！');
        return false;
    }
    if(password === ''){
        alert('密码不能为空！');
        return false;
    }
    if(formpwd === ''){
        alert('原密码不能为空！');
        return false;
    }
    if(repsword === ''){
        alert('密码不能为空！');
        return false;
    }
    if(password !== repsword) {
        document.getElementById('registerpwd').value="";
        document.getElementById('registerrepwd').value="";
        alert("两次密码不同，请重新输入");
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
            success:function(data){

                if (data.status) {/*indexOf("true")>-1*/
                    // location = "./用户界面.html"/*待修改*/
                    alert('修改成功！')
                }
                else {
                    document.getElementById('registerform').style.display="none";
                    alert('密码错误')
                }

                /*用户个人地址*/
            },
            error:function(){
                document.getElementById('registerform').style.display="none";
                alert('无法连接服务器')
            }
        })
    }


};


/*改用户名*/
var change_username= document.getElementById('change_username');

change_username.onclick =function() {
    var url=window.location.href;
    var username = url.match(/\?id=(.*)/)[1];

    var form_username=document.getElementById("form_name").value;
    var user_name=document.getElementById("user_name").value;
    if(form_username === "") {
        alert("原用户名不能为空!");

        return false;
    }

    if(user_name === "") {
        alert("新用户名不能为空!");

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
                    alert('修改成功')
                }
                 else if(data.status==='unfound')
                {
                    document.getElementById('signform').style.display="none";
                    alert('找不到原用户名')
                }
                else {
                    document.getElementById('signform').style.display="none";
                    alert('用户名重复')
                }

                /*用户个人地址*/
            },
            error:function(){
                document.getElementById('signform').style.display="none";
                alert('无法连接服务器')
            }
        })
    }

};



