function Earthquake(data){
	this.time 	= data[0];
	this.lat	= data[1];
	this.lon	= data[2];
	this.depth	= data[3];
	this.mag	= data[4];
}