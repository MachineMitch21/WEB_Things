
//Earthquake object to hold onto Earthquake data
var Earthquake = function (time, lat, lon, depth, mag){
	this.time 	= time;
	this.lat	= lat;
	this.lon	= lon;
	this.depth	= depth;
	this.mag	= mag;
}

//QuakePoint object used to visualize the Earthquake data to a point on the map
var QuakePoint = function(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

var mapImg;
var scaledImg;

var clat 	= 0;
var clon		= 0;
var zoom 	= 1;
var mapX 	= 1280;
var mapY 	= 1024;
var cx		= 0;
var cy		= 0;

var earthquakes;

function preload(){
	ldStr = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,' + zoom + ',0,0/' + mapX + 'x' + mapY + '?access_token=pk.eyJ1IjoibWl0Y2gtc2NodXR0IiwiYSI6ImNqMW1mMDFwazAwN20zM2thYmQ5b21ybWkifQ.zKBZz0z_L7AS_EpZJ9voTA';
	mapImg = loadImage(ldStr);
	
	earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv');
	console.log(earthquakes);
}

function setup(){
	var cvs = createCanvas(mapX, mapY);
	translate(width / 2, height / 2);
	imageMode(CENTER);
	image(mapImg, 0, 0);
	
	var cx = mercX(clon, zoom, mapX);
	var cy = mercY(clat, zoom, mapX);
	var maxMag = 0;
	
	for(var i = 1; i < earthquakes.length; i++){
		var data = earthquakes[i].split(/,/);
		var quake = new Earthquake(data[0], data[1], data[2], data[3], data[4]);
		var mag = quake.mag * 2;
		
		if(quake.mag > maxMag){
			maxMag = mag;		
		}
		
		var p = new QuakePoint(mercX(quake.lon, zoom, mapX) - cx, mercY(quake.lat, zoom, mapX) - cy, mag, mag);
		stroke(0, 0, 0);
		fill(255, 0, 0, 200);
		ellipse(p.x, p.y, p.w, p.h);
	}
	
	console.log(maxMag);
	cvs.parent("map"); 
	cvs.class("map_canvas");
	cvs.id("map-cvs");
}

function draw(){

}

function windowResized(){
	
} 

