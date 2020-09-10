var content=document.getElementById("content");
var aDiv=content.getElementsByTagName("div");
var fen=document.getElementById("fen");
var time=document.getElementById("time");
var fenshu=0;

startGame();
function startGame(){
	var n=200;
	var m=200;
	end=setInterval(function(){
		n--;
		time.style.backgroundSize=n/m*time.offsetWidth+"px 100%";
		if(n<0){
			alert("gameover!");
			clearInterval(end);
			clearInterval(ks);
		}
	},50);
}
start();

var fenshu=0;
for (var i = 0; i < aDiv.length; i++) {
	aDiv[i].onclick=function(){
		moveda(this);
		if(this.img=="a"){
			fenshu+=10;
		}else{
			fenshu-=10;
		}
		fen.innerHTML=fenshu;
	}
}


function start(){
	ks=setInterval(function(){
	var n= Math.floor(Math.random()*aDiv.length);
	if(Math.random()<0.3){
		aDiv[n].style.backgroundImage="url(img/b.png)";
		aDiv[n].img="b";
	}else{
		aDiv[n].style.backgroundImage="url(img/a.png)";
		aDiv[n].img="a";
	}
	moveUp(aDiv[n]);
	},1000);
}
moveda();
function moveda(obj){
	var i=6;
	th=setInterval(function (){
		obj.style.visibility="visible";
		i++;
		var newWidth=-obj.offsetWidth*i;
		obj.style.backgroundPosition=newWidth+"px 0";
		if(i>=9){
			setTimeout(function(){
			movedown(obj);	
			},200);
			clearInterval(th);
		}
	},50);
}

function moveUp(obj){
	var i=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		obj.style.visibility="visible";
		i++;
		var newWidth=-obj.offsetWidth*i;
		obj.style.backgroundPosition=newWidth+"px 0";
		if(i>=5){
			setTimeout(function(){
			movedown(obj);	
			},200);
			clearInterval(obj.timer);
		}
	},100);
}

function movedown(obj){
	var j=5;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		j--;
		var neww=-obj.offsetWidth*j;
		obj.style.backgroundPosition=neww+"px 0";
		if(j<=0){
			obj.style.visibility="hidden";
			clearInterval(obj.timer);
		}
	},50);
}
