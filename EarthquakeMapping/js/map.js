var mapImg;

var clat 	= 0;
var clon	= 0;
var zoom 	= 1;
var mapX 	= $("#map").width();
var mapY 	= $("#map").height();
var cx		= 0;
var cy		= 0;

var earthquakes;

function preload(){
	/* ldStr = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,' + zoom + ',0,0/' + mapX + 'x' + mapY + '?access_token=pk.eyJ1IjoibWl0Y2gtc2NodXR0IiwiYSI6ImNqMW1mMDFwazAwN20zM2thYmQ5b21ybWkifQ.zKBZz0z_L7AS_EpZJ9voTA';
	mapImg = loadImage(ldStr); */
	
	earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
}

function setup(){
	var cvs = createCanvas(mapX, mapY);
	translate(width / 2, height / 2);
	/* imageMode(CENTER);
	image(mapImg, 0, 0); */
	cvs.parent("map"); 
	cvs.class("map_canvas");
	cvs.id("map-cvs");
	
	var cx = mercX(clon, zoom, mapX);
	var cy = mercY(clat, zoom, mapX);

	for(var i = 0; i < earthquakes.length; i++){
		var data = earthquakes[i].split(/,/);
		var quake = new Earthquake(data);
		var p = new QuakePoint(mercX(quake.lon, zoom, mapX), mercY(quake.lat, zoom, mapX), 5, 5);
		fill(255, 0, 0, 200);
		ellipse(p.x, p.y, p.w, p.h);
	}
}

function draw(){

}

function windowResized(){
	
} 

