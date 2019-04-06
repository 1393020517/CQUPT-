



/*加载信息*/
window.onload=function () {
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




/*转到某页*/
function nextpage(number) {
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



/*删除用户*/
function del(number) {
    var user=document.getElementById('id'+number).innerHTML;
    document.getElementById('tr'+number).style.display="none";
    $.ajax({
        url:"./php/index1.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            page:number,
            id:user
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
