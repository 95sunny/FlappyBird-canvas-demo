//实时获取每一秒的帧数
(function () {
    window.FpsUtil = Class.extend({
        init: function () {
            //开始时间
            this.startTime = new Date();
            //开始帧数
            this.startFps = 0;
            //当前总帧数
            this.totalFps = 0;
            //实时fps
            this.newFps = 0;
        },
        render: function () {
            //累加帧数
            this.totalFps ++;
            var newTime = new Date();
            //判断是否过了1秒
            if (newTime - this.startTime >= 1000){
                //当前fps = 1秒结束时的帧数 - 1秒开始时的帧数
                this.newFps = this.totalFps - this.startFps;
                //更新开始时的帧数和时间
                this.startFps = this.totalFps;
                this.startTime = newTime;
            }
        }
    })
})();