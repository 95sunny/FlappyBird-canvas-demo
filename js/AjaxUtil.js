//加载本地数据
(function () {
    window.AjaxUtil = Class.extend({
        init: function () {
            //存储所有图片
            this.allImages = {};
        },
        //回调需要：所有图片对象，需要加载的图片数量，已经加载的图片数量
        loadImage: function (jsonUrl, callBack) {
            var that = this;
            //ajax
            var xhr = new XMLHttpRequest();
            xhr.open('get',jsonUrl);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //已经加载好的个数
                    var loadImg = 0;
                    //获取到的是一个字符串
                    var responseText = xhr.responseText;
                    //处理对象数据
                    var responseJson = JSON.parse(responseText);
                    var dataArray = responseJson.images;
                    for (var i = 0;i < dataArray.length;i++) {
                        //生成图片对象
                        var image = new Image();
                        image.src = dataArray[i].src;
                        //备份i
                        image.index = i;
                        image.onload = function () {
                            loadImg++;
                            //以{imgName: imgObj}的形式存储图片对象
                            var key = dataArray[this.index].name;
                            that.allImages[key] = this;
                            callBack(that.allImages, dataArray.length, loadImg)
                        }
                    }
                }
            }
        }
    })
})();