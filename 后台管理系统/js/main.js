

/*登录弹窗*/


function start() {
    document.getElementById('signform').style.display=""
}

function signclose() {
    document.getElementById('signform').style.display="none";
    document.getElementById('registerform').style.display="none"
}
/********************************/
/*跳转页面*/
var user_list = document.getElementById('user_list');
user_list.onclick=function () {
    location="./user.html"
}

var exam = document.getElementById('exam');
exam.onclick=function () {
    location="./examine.html"
}

var pic = document.getElementById('pic');
pic.onclick=function () {
    location="./picture.html"
}




/*登录接口*/
var turn = document.getElementById('denglubutton');
turn.onclick=function() {
    var username=document.getElementById("user").value;
    var userpwd=document.getElementById("pwd").value;
    if(username === "") {
        alert("账号不能为空!");

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

            success:function(data){


                if (data.status) {
                    document.getElementById('load').style.display="none";
                    document.getElementById('pic').style.display="";
                    document.getElementById('exam').style.display="";
                    document.getElementById('user_list').style.display="";

                    location = "./main.html?id="+username/*待修改*/
                }
                else {
                    document.getElementById('signform').style.display="none";

                    alert('用户名或密码错误')
                }


            },
            error:function(){
                document.getElementById('signform').style.display="none";
                alert('无法连接服务器')
            }
        })
    }

};






