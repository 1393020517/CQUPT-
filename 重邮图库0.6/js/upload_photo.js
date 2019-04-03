function ProcessFile(e) {
    var file = document.getElementById('file').files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var txt = event.target.result;

            var img = document.createElement("img");
            img.src = txt;//将图片base64字符串赋值给img的src

            document.getElementById("imgs").appendChild(img);
        };
    }
    reader.readAsDataURL(file);
}

function contentLoaded() {
    document.getElementById('file').addEventListener('change',
        ProcessFile, false);
}

window.addEventListener("DOMContentLoaded", contentLoaded, false);