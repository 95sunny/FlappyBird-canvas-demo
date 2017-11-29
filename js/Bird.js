(function () {
    window.Bird = Class.extend({
        init: function () {
            this.width = 85;
            this.height = 60;
            this.x = (game.canvas.width - this.width) * 0.5 ;
            this.y = 100;
            // 小鸟的飞行状态,取值:0,1,2
            this. wingState = 1;
            // 下落速度
            this.dy = 0;
            // 下落的帧数
            this.dropFps = game.fpsUtil.totalFps;
            // 下落的角度
            this.rotateAngle = 0;
            // 小鸟的状态： 0下落，1上升
            this.state = 0;
            // 空气阻力
            this.deleteY = 1;
            // 绑定事件
            this.bindClick();
            // 是否死亡
            this.die = false;
            // 动画的索引
            this.dieIndex = 0;
        },
        //绘制
        render: function () {
            // 死亡动画
            if(this.die == true){
                var clipW = 1625/5;
                var clipH = 828/6;
                // 求行号和列号
                var row = parseInt(this.dieIndex/5);
                var col = this.dieIndex%5;
                game.context.drawImage(game.allImages['blood'],col*clipW,row*clipH,clipW,clipH,this.x-100,this.y,clipW,clipH);
                // 游戏结束画面
                game.context.drawImage(game.allImages['gameover'],(game.canvas.width-626)*0.5,(game.canvas.height-144)*0.5);
                return;
            }
            game.context.save();
            // 画布位移到鸟的中心点
            game.context.translate(this.x+this.width*0.5,this.y+this.height*0.5);
            // 旋转
            game.context.rotate(this.rotateAngle*Math.PI/180);
            // 还原画布中心
            game.context.translate(-(this.x+this.width*0.5),-(this.y+this.height*0.5));
            // 绘制鸟
            game.context.drawImage(game.allImages['bird'],this.wingState * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.context.restore();
        },
        //更新
        update: function () {
            // 更新死亡索引
            if(this.die == true){
                this.dieIndex++;
                if (this.dieIndex >= 30){
                    game.pause();
                }
                return;
            }
            // 间隔5帧扇动一次
            if(game.fpsUtil.totalFps%5 == 0){
                // 扇动翅膀
                this.wingState++;
                if(this.wingState > 2){
                    this.wingState = 0;
                }
            }
            // 判断小鸟的行为
            if (this.state == 0){ //下落
                // 模拟自由落体
                this.dy = 0.01 * Math.pow((game.fpsUtil.totalFps - this.dropFps),2);
                this.rotateAngle++;
            } else if (this.state == 1){ //上升
                this.deleteY++;
                this.dy = -15 + this.deleteY;
                if (this.dy >= 0){ //下落
                    this.state = 0;
                    this.dropFps = game.fpsUtil.totalFps;
                }
            }
            // 更新y值
            this.y += this.dy;
            // 封锁上空
            if (this.y <= 0){
                this.y = 0;
            }
            // 坠亡
            if(this.y + this.height + 48 > game.canvas.height){
                // 游戏结束
                game.gameOver();
            }
        },
        // 事件
        bindClick: function () {
            var that = this;
            game.canvas.onmousedown = function () {
                that.state = 1;
                // 上升的高度
                that.rotateAngle = -25;
                // 复位空气阻力
                that.deleteY = 1;
            }
        }
    })
})();