function QuakePoint(cx, cy, quake){
	this.quake = quake;
	this.x = mercX(this.quake.lon) - cx;
	this.y = mercY(this.quake.lat) - cy;
	this.w = 8;
	this.h = 8;
}