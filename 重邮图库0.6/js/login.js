
/************************cookie******************************/



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
/**/







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

                if(data.status==='logged'){
                    location = "./user.html"/*待修改*/
                }
                else if (data.status) {/*indexOf("true")>-1*/
                    document.getElementById('displaysign').style.display="none";
                    document.getElementById('displaysign1').style.display="";
                    location = "./idnex.html?id="+username/*待修改*/


                    /*登陆后进入个人页面*/
                    // $('#displaysign1').attr('href','./user.html?id='+username);
                    var displaysign=document.getElementById('displaysign1');
                    displaysign.onclick=function () {
                        var user_id=document.getElementById('user').value;
                        window.location.href ="./user.html?id="+user_id

                    };
                }
                else {
                    document.getElementById('signform').style.display="none";

                    alert('验证失败请重新登录')
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


/*修改密码*/






var changepwd = document.getElementById('changepwd');
var user1=document.getElementById('registeruser');
var form_pwd=document.getElementById('registerformpwd');
var pwd1=document.getElementById('newpwd');


changepwd.onclick =function() {
    var password = document.getElementById("registerpwd").value;
    var repsword = document.getElementById("registerrepwd").value;
    var registername =document.getElementById("registeruser").value;
    var formpwd =document.getElementById("registerformpwd").value;
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
            xhrFields: {
                withCredentials: true
            },
            success:function(data){

                if (data.status/*indexOf("true")>-1*/) {
                    document.getElementById('registerform').style.display="none";
                    alert('修改成功')
                    /*待修改*/
                }
                else {
                    document.getElementById('registerform').style.display="none";

                    alert('验证失败请重新登录')
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

//
// /*改用户名*/
// var form_username=document.getElementById('form_name');
// var user_name=document.getElementById('user_name');
// var change_username= document.getElementById('change_username');
// change_username.onclick =function() {
//     var form_username=document.getElementById("form_name").value;
//     var user_name=document.getElementById("form_name").value;
//     if(form_username === "") {
//         alert("原用户名不能为空!");
//
//         return false;
//     }
//
//     if(user_name === "") {
//         alert("新用户名不能为空!");
//
//         return false;
//     }
//     else {
//         $.ajax({
//             url:"./php/index1.php",/*待修改*/
//             type:"POST",
//             dataType:"json",
//             data:{
//                 id:user.value,
//                 pwd:pwd.value
//             },
//             success:function(data){
//
//                 if (data.indexOf("true")>-1) {
//                     // location = "./用户界面.html"/*待修改*/
//                     alert('修改成功')
//                 }
//                 else {
//                     alert('验证失败请重新登录')
//                 }
//
//                 /*用户个人地址*/
//             },
//             error:function(){
//                 alert('无法连接服务器')
//             }
//         })
//     }
//
// };
//

