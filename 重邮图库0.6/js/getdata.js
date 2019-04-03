var url=window.location.href;
var datas = url.match(/\?key=(.*)/)[1];

// json=[
//     {
//         "one":['1'],
//         "src":['./img/flax.jpg']
//     },
//     {
//         "two":['2'],
//         "src":['./img/flax.jpg']
//     },
//     {
//         "three":['3'],
//         "src":['./img/flax.jpg']
//     },
// ]





$.ajax({
    url:"./php/search.php",/*待修改*/
    type:"POST",
    dataType:"json",
    data:{
        text:datas
    },
    success:function(data){


        for(i=0;i<12;i++){
            var pic=document.getElementById('pic'+i);
            pic.src=data[i].src[0]
        }

        for(i=0;i<12;i++){

            var title=data[i].tip[0];
         $(".point").html(title);

        }
    },
    error:function(){
        alert('无法连接服务器')
    }
})