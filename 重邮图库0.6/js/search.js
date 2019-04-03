
var search_btn = document.getElementById('search_btn');
search_btn.onclick=function () {
    var search_text = document.getElementById('search_1').value;
    if (search_text ===''){
        alert('输入框不能为空');
        return false;
    }
    else {
        location = "./result.html"
    }
}