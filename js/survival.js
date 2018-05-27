var graphic;
var score = 0;
var ship;
var enemies = [];
function setup(){
	graphic = document.querySelector('#main').getContext('2d');
	init();
	resize();
	ship = new Ship();
	ship.init();
	for (var i = 0; i < 3; i++) {
		enemies[i] = new Enemy(ship, random(width), random(height));
		enemies[i].init();
	}
	setInterval(draw,1000/40);
}
function draw(){
	graphic.fillStyle = '#000000'
	graphic.fillRect(0,0,width,height);
	if(ship.alive){
	ship.draw();
	ship.update();
		for (var i = 0; i < enemies.length; i++) {
			if(enemies[i].alive){
				enemies[i].draw();
				enemies[i].update();
			}else{
				var r = Math.ceil(random(0,4));
				switch(r){
					case 1:enemies[i] = new Enemy(ship,-width/20,-height/20);
					case 2:enemies[i] = new Enemy(ship,width + width/20,-height/20);
					case 3:enemies[i] = new Enemy(ship,-width/20,height + height/20);
					case 1:enemies[i] = new Enemy(ship,width + width/20,height + height/20);
				}
				score+=10;
				enemies[i].init();
			}
		}
	}else{
		if(confirm('game over.\nYour Score: '+ score +'\nRestart?')){
		location.reload();
		}else{
			window.location.href = 'index.html'
		}
	}
}
window.onload = setup;
window.onresize = resize;
