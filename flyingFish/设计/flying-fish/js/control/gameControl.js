/*
 * 游戏场景复杂创建游戏运行时所需的所有角色，
 * 然后提供一个方法，支配所有的角色执行。
 * */
(function(w) {

	/*
	 * constructor { GameScene } 控制游戏运行的场景对象
	 * param { options } 对象配置
	 * param { options.ctx: Context } 绘图上下文
	 * param { options.imgs: Object } 创建角色所需的所有图像
	 * */
	function GameControl(options) {

		this.ctx = options.ctx;
		this.imgs = options.imgs;

		// 存储游戏运行时所需的所有角色
		this.roles = [];

		// 小鱼死亡时，要执行的所有回调函数
		this.FishDieCallbackList = [];

		this.createRoles();
	}

	/*
	 * 给游戏场景对象的原型添加方法：
	 * 1、创建角色的方法
	 * 2、支配所有角色的方法
	 * 3、小鱼是否死亡的方法（死亡要通知游戏主函数，解决方式一会再说）
	 * */
	util.extend(GameControl.prototype, {

		// 创建该场景所需的角色
		createRoles: function() {
			var speedSecond =parseInt(sessionStorage.getItem("speed")); 
			var pipeTBSpace=parseInt(sessionStorage.getItem("tb")) ;
			var pipeLRSpace=parseInt(sessionStorage.getItem("lr"));
			var a=parseInt(sessionStorage.getItem("a"));
			var minHeight=parseInt(sessionStorage.getItem("min"));
			// 创建3个背景对象
			for(var i = 0; i < 3; i++) {
				this.roles.push(new Sky({ 
					ctx: this.ctx, 
					img: this.imgs.sky, 
					speedSecond: speedSecond 
				}));
			}

			// 创建7个管道对象
			for(var i = 0; i < 7; i++) {
				this.roles.push(new Pipe({
					ctx: this.ctx,
					imgDown: this.imgs.pipeDown,
					imgUp: this.imgs.pipeUp,
					a: a,
					speedSecond: speedSecond,
					pipeTBSpace: pipeTBSpace,
					pipeLRSpace: pipeLRSpace,
					minHeight: minHeight,
					maxHeight: this.ctx.canvas.height - this.imgs.land.height - minHeight - pipeTBSpace
				}));
			}

			// 创建4个大地对象
			for(var i = 0; i < 2; i++) {
				this.roles.push(new Land({ 
					ctx: this.ctx, 
					speedSecond: speedSecond, 
					img: this.imgs.land 
				}));
			}

			// 创建1个计时器对象
			this.roles.push(new Timer({ ctx: this.ctx }));

			// 创建1个鱼对象
			this.roles.push(new Fish({ ctx: this.ctx, img: this.imgs.fish, widthFrame: 3, heightFrame: 1 }));
		},

		// 让所有的角色依据游戏的延迟时间进行响应
		run: function(delaySecond) {
			this.roles.forEach(function(role) {
				role.draw();
				role.update(delaySecond);
			});

			// 每次绘制完毕后，看看小鱼有没有死亡，如果死亡了，
			// 执行所有的小鱼死亡回调
			if(this.isFishDie()) {
				this.runFishDieCbk();
			}
		},

		// 判断小鱼是否死亡
		isFishDie: function() {
			var fish = this.roles[this.roles.length - 1];
			var fishCoreX = fish.x + fish.width / 2;
			var fishCoreY = fish.y + fish.height / 2;
			if(fishCoreY < 0 || fishCoreY > (this.ctx.canvas.height - this.imgs.land.height) ||
				this.ctx.isPointInPath(fishCoreX, fishCoreY)) {
				return true;
			}
			return false;
		},

		// 执行小鱼死亡时所有的回调
		runFishDieCbk: function() {
			this.FishDieCallbackList.forEach(function(fn) {
				fn();
			});
		},

		// 添加小鱼死亡的回调
		addFishDieCbk: function(fn) {
			this.FishDieCallbackList.push(fn);
		}

	});

	w.GameControl = GameControl;

}(window));