function Enemy(s,x,y){
		this.draw = function(){
		graphic.beginPath();
		graphic.save();
		graphic.translate(this.x,this.y);
		graphic.rotate(this.angle);
		graphic.arc(0,0,
			this.width/2,0,Math.PI * 2);
		graphic.restore();
		graphic.lineWidth = width/400;
		graphic.fillStyle = '#FF0000';
		graphic.fill();
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].draw();
		}
	}
	this.update = function(){
		var time = new Date().getTime();
		if(time - this.stime >= this.interval){
			this.bullets[this.bullets.length] = new Bullet(this);
			this.stime = new Date().getTime();
		}else{
			graphic.save();
			graphic.translate(this.x,this.y);
			var dX = s.x - this.x;
			var dY = s.y - this.y;
			this.angle = Math.atan2(dY,dX);
			this.dx = Math.cos(this.angle) * this.vel.x;
			this.dy = Math.sin(this.angle) * this.vel.y;
			var distx = this.x - s.x;
			var disty = this.y - s.y;
			graphic.restore();
			if(Math.abs(Math.sqrt(distx * distx + disty * disty)) >= this.distance){
				this.x += this.dx;
				this.y += this.dy;
			}
		}
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].update();
			if(s.hit(this.bullets[i])){
				s.health-=10;
				this.bullets.splice(i,1);
			}else if(this.bullets[i].x < 0 || this.bullets.x > width
			|| this.bullets[i].y < 0 || this.bullets[i].y > height){
				this.bullets.splice(i,1);
			}
		}
		for (var i = 0; i < s.bullets.length; i++) {
				if(this.hit(s.bullets[i])){
					console.log('1o1');
					s.bullets.splice(i,1);
					this.alive = false;
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
	stime = new Date().getTime();
	this.init = function(){
		this.alive = true;
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.width = width/20;
		this.vel = {x:width/100,y:height/200};
		this.angle = 0;
		this.bullets = [];
		this.interval = random(1400,2800);
		this.distance = random(this.width,this.width*6)
		this.stime = new Date().getTime();
	}
}