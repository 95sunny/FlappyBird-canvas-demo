//背景
(function () {
    window.Background = Class.extend({
        init: function (option) {
            option = option || {};
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;
            //绘制数量
            this.count= parseInt(game.canvas.width/this.width) + 1;
            //背景运动速度
            this.speed = option.speed || 1;
            //图片
            this.image = option.image;
        },
        //绘制背景
        render: function () {
            for (var i = 0; i < this.count + 1; i++) {
                game.context.drawImage(this.image,this.x + i * this.width,this.y,this.width,this.height);
            }
        },
        //背景更新
        update: function () {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x = 0;
            }
        },
        //背景暂停
        pause: function () {
            this.speed = 0;
        }
    })
})();