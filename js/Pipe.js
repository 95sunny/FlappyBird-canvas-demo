//管道
(function () {
    window.Pipe = Class.extend({
        init: function () {
            // 方向，0向下，1向上
            this.dir = _.random(0,1);
            this.width = 148;
            this.height = _.random(100,(game.canvas.height - 48) * 0.5);
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - this.height - 48;
            //速度
            this.speed = game.floor.speed;
        },
        //绘制
        render: function () {
            if (this.dir == 0){//向下
                game.context.drawImage(game.allImages['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }else if (this.dir == 1){//向上
                game.context.drawImage(game.allImages['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },
        //更新
        update: function () {
            this.x -= this.speed;
            //移除离开画布的管道
            if(this.x < -this.width){
                game.pipeArray = _.without(game.pipeArray,this)
            }
            // 碰撞检测
            if(game.bird.x+game.bird.width>this.x && game.bird.x<this.x+this.width){
                // 进入管道区域
                if(this.dir == 0 && game.bird.y<this.height){ //向下
                    // 游戏结束
                    game.gameOver();
                } else if (this.dir == 1 && game.bird.y+game.bird.height>this.y){ //向上
                    // 游戏结束
                    game.gameOver();
                }
            }
        },
        //暂停
        pause: function () {
            this.speed = 0;
        }
    })
})();