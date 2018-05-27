function Ship() {
	this.draw = function(){
		graphic.beginPath();
		graphic.fillStyle = '#FF0000';
		graphic.arc(width/7,height - width/7,
		width/10, 0, Math.PI *2);
		graphic.fillStyle = 'rgba(0,255,0,0.2)';
		graphic.arc(width/7,height - width/7,
			width/7, 0, Math.PI *2);
		graphic.fill();
		graphic.stroke();
		graphic.closePath();
		graphic.beginPath();
		graphic.save();
		graphic.translate(this.x,this.y);
		graphic.rotate(this.angle);
		graphic.arc(0,0,
			this.width/2,Math.PI * 0.2, -Math.PI * 0.2);
		graphic.strokeStyle = '#00FF00';
		graphic.lineWidth = width/400;
		graphic.fillStyle = '#00FF00';
		graphic.stroke();
		graphic.restore();
		graphic.fillStyle = 'red';
		graphic.fillRect(width - width/7, 0, width/8,height/12)
		graphic.fillStyle = '#00FF00';
		graphic.fillRect(width - width/7, 0, map(this.health, 0,100,0,width/8),height/12);
		for(var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].draw();
		}
	}
	this.update = function(){
		if(this.health <= 0){
			this.health = 0;
			this.alive = false;
		}
		var dX = ctrl.x - this.x;
		var dY = ctrl.y - this.y;
		var a = Math.atan2(dY,dX);
		if(a < this.angle){
			this.angle-=0.1;
		}else if(a > this.angle){
			this.angle+=0.1;
		}
		if(ctrl.up){
			this.vel.y-= height/300;
		}if(ctrl.down){
			this.vel.y+= height/300;
		}if(ctrl.left){
			this.vel.x-= width/600;
		}if(ctrl.right){
			this.vel.x+= width/600;
		}
		if(this.x < this.width/2){
			this.x = width - this.width/2;
		}if(this.y < this.width/2){
			this.y = height - this.width/2;
		}if(this.x > width - this.width/2){
			this.x = this.width/2;
		}if(this.y > height - this.width/2){
			this.y = this.width/2;
		}
		this.vel.x*=0.9;
		this.vel.y*=0.9;
		this.x+=this.vel.x;
		this.y+=this.vel.y;
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].update();
			if(this.bullets[i].x < 0 || this.bullets.x > width
			|| this.bullets[i].y < 0 || this.bullets[i].y > height){
				this.bullets.splice(i,1);
			}
		}
	}
	this.hit = function(b){
		var dx = b.x - this.x;
		var dy = b.y - this.y;
		if(Math.abs(Math.sqrt(dx * dx + dy * dy)) <= this.width/2 + b.width/2){
			return true;
		}else return false;
	}
	this.init = function(){
		this.alive = true;
		this.x = width/2;
		this.y = height/2;
		this.dx = 0;
		this.dy = 0;
		this.width = width/20;
		this.vel = {x:0,y:0};
		this.angle = 0;
		this.bullets = [];
		this.interval = 80;
		this.bulletLimit = 20;
		this.health = 100;
	}
}