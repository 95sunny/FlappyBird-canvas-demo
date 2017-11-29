(function () {
    window.Game = Class.extend({
        // 初始化
        init: function (option) {
            var that = this;
            option = option || {};
            this.fps = option.fps || 60;
            // FPS工具
            this.fpsUtil = new FpsUtil();
            // 获取画布和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');
            // 加载本地数据的工具
            this.ajaxUtil = new AjaxUtil();
            // 加载数据
            this.allImages = {};
            // 回调需要：所有图片对象，需要加载的图片数量，已经加载的图片数量
            this.ajaxUtil.loadImage('r.json',function (allImage, allImageCount, loadImageCount) {
                // 判断是否需要加载完毕
                if (allImageCount == loadImageCount) {
                    that.allImages = allImage;
                    // 运行游戏
                    that.run();
                }
            });
            // 记录游戏是否正在运行
            this.isRun = true;
        },
        // 运行游戏
        run: function () {
            var that = this;
            // 使用定时器，保持游戏在运行的状态
            // 为保证游戏质量，定时器时间间隔为每一帧的时间
            this.timer = setInterval(function () {
                that.runLoop();
            },1000/that.fps);
            // 创建背景
            this.house = new Background({
                image: this.allImages['house'],
                y: this.canvas.height - 256 - 100,
                width: 300,
                height: 256,
                speed: 3
            });
            this.tree = new Background({
                image: this.allImages['tree'],
                y: this.canvas.height - 216 - 48,
                width: 300,
                height: 216,
                speed: 4
            });
            this.floor = new Background({
                image: this.allImages['floor'],
                y: this.canvas.height - 48,
                width: 48,
                height: 48,
                speed: 5
            });
            // 定义一个管道数组
            this.pipeArray = [new Pipe()];
            // 创建小鸟
            this.bird = new  Bird();
        },
        // 游戏过程,每一帧都执行
        runLoop: function () {
            // 运行帧计算工具
            this.fpsUtil.render();
            // 绘制fps
            this.context.clearRect(0,0,canvas.width,canvas.height);
            this.context.fillText('FPS/' + this.fpsUtil.newFps,15,15);
            this.context.fillText('FNO/' + this.fpsUtil.totalFps,15,30);
            // 渲染更新背景
            this.house.update();
            this.house.render();
            this.tree.update();
            this.tree.render();
            this.floor.update();
            this.floor.render();
            // 每次创建管道会把原来的管道覆盖，解决方法是定义一个管道数组
            // 按照帧数间隔创建管道
            if(this.isRun && this.fpsUtil.totalFps%70 == 0){
                this.pipeArray.push(new Pipe());
            }
            // 更新管道
            for (var i = 0; i < this.pipeArray.length; i++) {
                this.pipeArray[i].update();
            }
            // 绘制管道
            for (var i = 0; i < this.pipeArray.length; i++) {
                this.pipeArray[i].render();
            }
            //渲染更新小鸟
            this.bird.update();
            this.bird.render();
        },
        // 暂停游戏
        pause: function () {
            // 停止游戏运行
            clearInterval(this.timer);
        },
        // 结束游戏
        gameOver: function () {
            // 游戏结束
            this.isRun = false;
            // 暂停背景
            this.house.pause();
            this.tree.pause();
            this.floor.pause();
            // 暂停管道
            for (var i = 0; i < this.pipeArray.length; i++) {
                this.pipeArray[i].pause();
            }
            // 小鸟死亡
            game.bird.die = true;
        }
    })
})();