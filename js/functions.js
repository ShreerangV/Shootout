var width,height;
var stime = new Date().getTime();
var ctrl = {x:0,y:0,
	left: false, right: false, up: false, down: false
};
function map(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}
function random(mn,mx) {
	if(!mx){mx = mn;mn = 0;}
	return (Math.random() * (mn - mx) + mx);
}
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
function fire(e){
	var time = new Date().getTime();
	if(time - stime >= ship.interval){
		ship.bullets[ship.bullets.length] = new Bullet(ship);
	}
	stime = new Date().getTime();
}
var phone = detectmob();
var u,d,r,l;
function init(){
if(phone){
	function move(e){
		var size = width/3.5;
		for(var i = 0;i < e.touches.length; i++){
			var x = e.touches[i].pageX - graphic.canvas.offsetLeft;
			var y = e.touches[i].pageY - graphic.canvas.offsetTop;
			if(x < size && y > height - size){
				graphic.beginPath();
				graphic.arc(x,y,width/30,0, Math.PI * 2);
				graphic.stroke();
				if(x < size/3.5){
					ctrl.left = true;
				}else if(x > size/1.75){
					ctrl.right = true;
				}else if(y < height - size/3.5){
					ctrl.up = true;
				}else if(y > height - size/1.75){
					ctrl.down = true;
				}
			}else{
				ctrl.x = x;
				ctrl.y = y;
				fire(e);
			}
		}
	}
	graphic.canvas.addEventListener('touchstart',move);
	graphic.canvas.addEventListener('touchmove',move);
	graphic.canvas.addEventListener('touchend',function(){
		ctrl.up = ctrl.down = ctrl.left = ctrl.right = false;
	});
}else{
	function move(e){
		ctrl.x = e.pageX;
		ctrl.y = e.pageY;
	}
	function keyListener(e){
		var key_state = (e.type == 'keydown')?true:false;
		switch(e.keyCode){
		case 37: ctrl.left = key_state;break;
		case 39: ctrl.right = key_state;break;
		case 38: ctrl.up = key_state;break;
		case 40: ctrl.down = key_state;break;
		}
	}
	window.addEventListener('keydown',keyListener);
	window.addEventListener('keyup',keyListener);
	graphic.canvas.addEventListener('mousedown',fire);
	graphic.canvas.addEventListener('mousemove',move);
	graphic.canvas.addEventListener('mouseup',fire);
}
}
resize = function(){
		if(window.innerWidth/2>window.innerHeight){
			var h = window.innerHeight;
			var ratio = 200/100;
			var w = h * ratio;
		}else{
			var w = window.innerWidth;
			var ratio = 100/200;
			var h = w * ratio;
		}
		graphic.canvas.width = w;
		graphic.canvas.height = h;
		width = graphic.canvas.width;
		height = graphic.canvas.height;
}
