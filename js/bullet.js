function Bullet(s){
	this.vel = width/68;
	this.x = s.x;
	this.y = s.y;
	this.width = width/200;
	this.height = height/25;
	this.angle = s.angle;
	this.dx = Math.cos(s.angle) * this.vel;
	this.dy = Math.sin(s.angle) * this.vel;
	this.draw = function(){
		graphic.save();
		graphic.translate(this.x,this.y);
		graphic.rotate(this.angle);
		graphic.beginPath();
		graphic.fillStyle = '#00FF00';
		graphic.arc(0, 0, this.width, 0, Math.PI * 2);
		graphic.fill();
		graphic.restore();
	}
	this.update = function(){
		graphic.save();
		graphic.translate(this.x,this.y);
		graphic.rotate(this.angle);
		this.x+= this.dx;
		this.y+= this.dy;
		graphic.restore();
	}
}
