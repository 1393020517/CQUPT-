
/*********cookie******************/
function setCookie(c_name,value,expireseconds){
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireseconds * 1000);
    document.cookie=c_name+ "=" +escape(value)+
        ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
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

                    setCookie('cookie_name','jiasai',3600*2);
                    location = "./examine.html"/*待修改*/
                }
                else {
                    alert('用户名或密码错误')
                }


            },
            error:function(){

                alert('无法连接服务器')
            }
        })
    }

};






