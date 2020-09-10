
(function( w ) {
		var cvs = document.querySelector('canvas');
        var ctx = cvs.getContext('2d');

        // 加载游戏所需的所有图片，
        // 加载完毕后就可以创建不同的对象，
        // 然后绘制到画布中，共同构成游戏画面
        loadImg({
            fish: '../../imgs/fish.png',
            land: '../../imgs/land.png',
            pipeDown: '../../imgs/iceDown.png',
            pipeUp: '../../imgs/iceUp.png',
            sky: '../../imgs/sky.png'
        }, function( loadedImg ) {

            var gameLastTime, isStop = false;
            var gameControl = new GameControl( { ctx: ctx, imgs: loadedImg } );
            var gameOver = new GameOver( { ctx: ctx } );

            // 小鱼死了，定时器结束
            gameControl.addFishDieCbk( function() {
                isStop = true;
            } );

            // 小鱼死了，绘制游戏结束场景
            gameControl.addFishDieCbk( function() {
                gameOver.run();
                gameOver.bind();
            } );

            (function loop() {

                // 如果游戏结束了，那么直接返回，不在轮回调用
                if( isStop ) {
                	document.getElementsByTagName("audio")[0].pause();
                	return;
                }

                /*
                 * 计算当前游戏画面和上一次游戏画面绘制时中间的时间差：
                 * 1、先记录一个游戏最后一次绘制的时间
                 * 2、然后每次绘制新的游戏画面时，得到当前最新的时间
                 * 3、两个游戏画面之间所间隔的时间 = 当前最新时间 - 上一次绘制时的时间
                 * */

                // 游戏画面最后一次绘制的时间，
                // 第一次为当前时间，以后都为上一次游戏画面绘制的时间
                gameLastTime = gameLastTime? gameLastTime: Date.now();
                var gameCurrentTime = Date.now();
                var delaySecond = (gameCurrentTime - gameLastTime) / 1000;

                // 下一次游戏画面绘制的最后时间，是当前时间
                gameLastTime = gameCurrentTime;

                // 每次绘制新游戏画面时，先清除老的画面和老的管道路径
                ctx.clearRect( 0, 0, cvs.width, cvs.height );
                ctx.beginPath();
                gameControl.run( delaySecond );

                requestAnimationFrame( loop );
            }());
        });
}( window ));