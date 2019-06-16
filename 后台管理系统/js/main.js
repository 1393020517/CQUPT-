

/*判断cookie*/

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

window.onload=function () {

    var cookie=getCookie('CQUPT_pictures_manager');
    if(cookie==='' ){
        location = "./login.html"
    }
};



/*top_nav控件*/


function review_pic(){

    document.getElementById('help').style.display="none";
        document.getElementById('manager').style.display="none";
        document.getElementById('user').style.display="none";
    document.getElementById('examine').style.display='';
    }
function manager_pic(){
    document.getElementById('help').style.display="none";
    document.getElementById('examine').style.display='none';
    document.getElementById('user').style.display="none";
    document.getElementById('manager').style.display="";
}
function user(){

    document.getElementById('examine').style.display='none';
    document.getElementById('help').style.display="none";
    document.getElementById('manager').style.display="none";
    document.getElementById('user').style.display=""

}

function help() {
    document.getElementById('examine').style.display='none';
    document.getElementById('manager').style.display="none";
    document.getElementById('user').style.display="none";
    document.getElementById('help').style.display=""
}


/*审核分页*/

layui.use('laypage', function(){
    var laypage = layui.laypage;


    laypage.render({
        elem: 'examine_page' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: 50 //数据总数，从服务端得到
        ,layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip']
        ,theme: '#1E9FFF'
        ,jump: function(obj){
            //得到当前页，以便向服务端请求对应页的数据。
            $.ajax({
                url:"./Php/gettemp.php",/*待修改*/
                type:"POST",
                dataType:"json",
                data:{
                    page:obj.curr
                },
                success:function (data) {
                    var examine_pictures=document.getElementsByClassName('examine_picture');

                    for(i=0;i<examine_pictures.length;i++){
                        var examine_picture =examine_pictures[i];
                        examine_picture.src=data[i].src
                    }
                    var examine_titles=document.getElementsByClassName('examine_title');
                    for(i=0;i<examine_titles.length;i++){
                        var examine_title=examine_titles[i];
                        examine_title.innerHTML=data[i].title
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

/*审核通过*/
function pass(number) {
    var pass_img=document.getElementsByClassName('examine_picture')[number];

    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{

            src:pass_img.src
        },
        success:function (data) {
            var pass_img_div=document.getElementsByClassName('examine_pictures')[number];
            pass_img_div.style.display="none";
            layer.msg('通过', {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, );
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

/*审核不通过*/

function unpass(number){
    layer.prompt({
        formType: 2,
        value: '',
        title: '请输入原因',
        area: ['400px', '200px'] //自定义文本域宽高
    }, function(value, index, elem){
        var unpass_img=document.getElementsByClassName('examine_picture')[number];

        $.ajax({
            url:"./Php/gettemp.php",/*待修改*/
            type:"POST",
            dataType:"json",
            data:{
                reason:value
                ,src:unpass_img.src
            },
            success:function (data) {
                var unpass_img_div=document.getElementsByClassName('examine_pictures')[number];
                unpass_img_div.style.display="none";
                layer.close(index);
                layer.msg('已经收到您的反馈，我们会告知用户', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, );
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

    });
}


/***********************图片管理分页*********************/



layui.use('laypage', function(){
    var laypage = layui.laypage;


    laypage.render({
        elem: 'manager_page' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: 50 //数据总数，从服务端得到
        ,layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip']
        ,theme: '#1E9FFF'
        ,jump: function(obj){
            //得到当前页，以便向服务端请求对应页的数据。
            $.ajax({
                url:"./Php/gettemp.php",/*待修改*/
                type:"POST",
                dataType:"json",
                data:{
                    page:obj.curr
                },
                success:function (data) {
                    var manager_pictures=document.getElementsByClassName('manager_picture');

                    for(i=0;i<manager_pictures.length;i++){
                        var manager_picture =manager_pictures[i];
                        manager_picture.src=data[i].src
                    }
                    var manager_titles=document.getElementsByClassName('manager_title');
                    for(i=0;i<manager_titles.length;i++){
                        var manager_title=manager_titles[i];
                        manager_title.innerHTML=data[i].title
                    }
                    var nice_pictures=document.getElementsByClassName('manager_nice');
                    for(i=0;i<nice_pictures.length;i++){
                        var nice_picture=nice_pictures[i];
                        nice_picture.innerHTML=data[i].nice
                    }
                    var click_pictures=document.getElementsByClassName('manager_click');
                    for(i=0;i<click_pictures.length;i++){
                        var click_picture=click_pictures[i];
                        click_picture.innerHTML=data[i].click
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


/*删除图片*/
function manager_del(number) {
    var del_img=document.getElementsByClassName('manager_picture')[number];
    $.ajax({
        url:"./Php/gettemp.php",/*待修改*/
        type:"POST",
        dataType:"json",
        data:{
            image:del_img.src
        },
        success:function (data) {
            if(data.status){
                var del_div=document.getElementsByClassName('manager_pictures')[number];
                del_div.style.display="none";
                layer.msg('删除成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, );
            }
        else{
            alert('???')
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





/************************用户**********************************/
layui.use('table', function(){
    var table = layui.table;

    table.render({
        elem: '#user_table'
        ,url:'/'
        ,height: 600
        ,width:900
        ,page: { //jump/elem 不能传入
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局

            ,groups: 1 //只显示 1 个连续页码
            ,first: false //不显示首页
            ,last: false //不显示尾页

        }
        ,cols: [[
            {field:'id', width:300, title: '学号', sort: true},
            {field:'username', width:300, title: '用户名'},
            {field:'pwd', width:300, title: '密码'},

        ]]

    });
});

/*关于我们*/


    layui.use('layer', function(){
        var $ = layui.jquery, layer = layui.layer;


        var active = {

            notice: function(){
                //示范一个公告层
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['关闭']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">By：重邮e站<br>^_^<br><a href="https://github.com/1393020517/CQUPTpictures" style="color: #1da3f5">Github</a></div>'
                    ,success: function(layero){
                        var btn = layero.find('.about');
                        btn.find('.layui-layer-btn0').attr({
                            href: 'http://www.layui.com/'
                            ,target: '_blank'
                        });
                    }
                });
            }
        };

        $('#navs .about').on('click', function(){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });

    });





