var image = '';
function selectImage(file){
    if(!file.files || !file.files[0]){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt){
        document.getElementById('image').src = evt.target.result;
        image = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
}


var upload=document.getElementById('upload');
upload.onclick=function () {
    /*获取图片名称*/
    var str;
    // $('#fil').change(function () {

        str = document.getElementById('fil').value;
        var arr = str.split('\\');
        var name = arr[arr.length - 1];

        /*图片标签*/
        var options = $("#select option:selected");
        var text = options.val();


        /*id*/
    var url=window.location.href;
    var datas = url.match(/\?id=(.*)/)[1];
        $.ajax({

            type: 'POST',
            url: './php/save.php',
            data: {
                image:image ,
                file_name: name,
                title: text,
                id:datas
            },

            dataType: 'json',
            success: function (data) {
                console.log(data)
                if (data.status) {
                    alert('上传成功');
                }
                // if (data.status == 'logged') {
                //     location = "./user.html"
                //     /*待修改*/
                // }
                else {
                    alert('上传失败');
                }
            },
            error: function (err) {
                alert('网络故障');
            }
        });
    // });
}













/*上传图片*/
// $('input[type="file"]').on('change',doUpload);
// function doUpload() {
//     var file =this.file[0];
//     if(!/image\/\w+/.test(file.type)){
//         alert('文件必须为图片');
//         return false;
//     }
//     var formdata =new FormData($("#upload_pictures")[0]);
//
//     $.ajax({
//         url: '',
//         type: 'post',
//         data: formdata,
//         dataType: 'json',
//         async: false,
//         cache:false,
//         contentType:false,
//         processData: false,
//         success:function (data) {
//             alert('上传成功')
//         },
//         error:function (data) {
//             alert('上传失败')
//         }
//     });
// }

/*上传图片*/








window.onload = function() {
                var container = document.getElementById('container');
                var list = document.getElementById('list');
                var buttons = document.getElementById('buttons').getElementsByTagName('span');
               var prev = document.getElementById('prev');
                var next = document.getElementById('next');
                var index = 1;
                var timer;

                function animate(offset) {
                        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
                        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
                        var newLeft = parseInt(list.style.left) + offset;
                        list.style.left = newLeft + 'px';
                        //无限滚动判断
                        if (newLeft > -1340) {
                                list.style.left = -2680 + 'px';
                             }
                         if (newLeft < -2680) {
                                 list.style.left = -1340 + 'px';
                             }
    }

                function play() {
                        //重复执行的定时器
                        timer = setInterval(function() {
                                next.onclick();
                             }, 2000)
                     }

                function stop() {
                       clearInterval(timer);
    }

               function buttonsShow() {
                        //将之前的小圆点的样式清除
                        for (var i = 0; i < buttons.length; i++) {
                                if (buttons[i].className == "on") {
                                        buttons[i].className = "";
                                     }
                             }
                        //数组从0开始，故index需要-1
                         buttons[index - 1].className = "on";
                     }

                prev.onclick = function() {
                         index -= 1;
                        if (index < 1) {
                                index = 5
                             }
                        buttonsShow();
                        animate(1340);
                     };

                 next.onclick = function() {
                         //由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
                        index += 1;
                         if (index > 5) {
                                index = 1
                             }animate(-1340);
                        buttonsShow();
                     };

                 for (var i = 0; i < buttons.length; i++) {
                         (function(i) {
                                 buttons[i].onclick = function() {

                                         /*   这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                                        /*   由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                                       var clickIndex = parseInt(this.getAttribute('index'));
                                        var offset = 1340 * (index - clickIndex); //这个index是当前图片停留时的index
                                        animate(offset);
                                         index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
                                        buttonsShow();
                                    }
        })(i)
    }

               container.onmouseover = stop;
                container.onmouseout = play;
                play();

}





/*搜索跳转*/


var search_result=document.getElementById('search_result');
search_result.onclick=function () {
    var search_text = document.getElementById('search_result1').value;
    window.location.href = "./result.html?key=" + search_text
}