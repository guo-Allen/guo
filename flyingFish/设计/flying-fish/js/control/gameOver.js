/*
* 实现思路：
* 1、要绘制一个填出遮盖层( 一个半透膜的矩形 )
* 2、再在画布的中间绘制提示文字：GAMEOVER！！！
* */
( function( w ) {

    /*
    * constructor { gameOver } 游戏结束场景
    * param { options } 参数配置
    * param { options.ctx: Context } 绘图环境
    * param {  }
    * */
    function GameOver( options ) {
        this.ctx = options.ctx;

        // 重新开始按钮的宽和高
        this.btnWidth = 300;
        this.btnHeight = 80;
        this.btnX = 0;
        this.btnY = 0;
    }

    util.extend( GameOver.prototype, {

        // 绘制游戏结束场景
        run: function() {
            this.ctx.save();

            // 游戏中心坐标
            var gameCoreX = this.ctx.canvas.width / 2;
            var gameCoreY = this.ctx.canvas.height / 2;

            // 绘制一个遮盖层
            this.ctx.fillStyle = 'rgba( 0, 0, 0, 0.5 )';
            this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

            // 绘制文字
            this.ctx.font = '500 50px 微软雅黑';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'bottom';
            this.ctx.fillStyle = 'orange';
            this.ctx.fillText( 'GAMEOVER!!!', gameCoreX, gameCoreY - 180 );

            // 绘制按钮
            this.ctx.strokeStyle = 'deeppink';
            this.ctx.fillStyle = 'deeppink';
            this.ctx.lineWidth = 4;
            this.ctx.textBaseline = 'middle';
            this.btnX = gameCoreX - this.btnWidth;
            this.btnY = gameCoreY - this.btnHeight / 2 + 40;
            this.ctx.strokeRect( this.btnX, this.btnY, this.btnWidth, this.btnHeight );
            this.ctx.fillText( '重新开始', this.btnX + this.btnWidth / 2, this.btnY + this.btnHeight / 2 );
            this.ctx.beginPath();
            this.ctx.strokeRect( this.btnX+400, this.btnY, this.btnWidth, this.btnHeight );
            this.ctx.fillText( '选择难度', this.btnX + this.btnWidth / 2+400, this.btnY + this.btnHeight / 2 );
            this.ctx.restore();
        },

        // 重新开始按钮点击事件
        bind: function() {
            var self = this;
            this.ctx.canvas.addEventListener( 'click', function( e ) {
                // 求鼠标点击时相对于画布的路径
                var x= e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;
                // 画按钮的矩形路径
                self.ctx.beginPath();
                self.ctx.rect( self.btnX, self.btnY, self.btnWidth, self.btnHeight );
				self.ctx.beginPath();
				self.ctx.rect( self.btnX+400, self.btnY, self.btnWidth, self.btnHeight );
                // 如果在，刷新页面重新开始游戏
              
                if(x>self.btnX&&x<self.btnX+self.btnWidth&&y>self.btnY&&y<self.btnY+self.btnHeight ) {
                    location.reload();
                }
                //如果在，重新选游戏难度
                if( x>self.btnX+400&&x<self.btnX+400+self.btnWidth&&y>self.btnY&&y<self.btnY+self.btnHeight ) {
                    window.location.href='../../index.html';
                }
            });
        }
    } );

    w.GameOver = GameOver;

}( window ));
