
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

//I am starting to implement Backbone but it will break the app at this point so it is commented out for the commit to GitHub

/* var EarthquakeModel = Backbone.Model.extend({
	
	defaults:{
		time: 		"Now o' clock",
		lat:  		39.768377,
		lon:		-86.158042,
		depth:		10,
		mag:		5,
		selected:	false
	}
	
});

var QuakePointModel = Backbone.Model.extend({
	
	defaults:{
		x:			mercX(39.768377, 1, 1280),
		y:			mercY(-86.158042, 1, 1280),
		w:			10,
		h:			10
	}
	
}); */

var mapImg_dark;
var mapImg_streets;
var mapImg_satellite;
var scaledImg;

var clat 	= 0;
var clon	= 0;
var zoom 	= 1;
var mapX 	= 1024;
var mapY 	= 1024;
var cx		= 0;
var cy		= 0;

var earthquakes;

var dark_url;
var sat_url;
var street_url;

function preload(){
	dark_url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,' + zoom + ',0,0/' + mapX + 'x' + mapY + '?access_token=pk.eyJ1IjoibWl0Y2gtc2NodXR0IiwiYSI6ImNqMW1mMDFwazAwN20zM2thYmQ5b21ybWkifQ.zKBZz0z_L7AS_EpZJ9voTA';
	sat_url = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,' + zoom + ',0,0/' + mapX + 'x' + mapY + '?access_token=pk.eyJ1IjoibWl0Y2gtc2NodXR0IiwiYSI6ImNqMW1mMDFwazAwN20zM2thYmQ5b21ybWkifQ.zKBZz0z_L7AS_EpZJ9voTA';
	street_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/0,0,' + zoom + ',0,0/' + mapX + 'x' + mapY + '?access_token=pk.eyJ1IjoibWl0Y2gtc2NodXR0IiwiYSI6ImNqMW1mMDFwazAwN20zM2thYmQ5b21ybWkifQ.zKBZz0z_L7AS_EpZJ9voTA';
	
	mapImg_dark = loadImage(dark_url);
	mapImg_streets = loadImage(street_url);
	mapImg_satellite = loadImage(sat_url);
	
	earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
	console.log(earthquakes);
}

function setup(img){
	var cvs = createCanvas(mapX, mapY);
	translate(width / 2, height / 2);
	imageMode(CENTER);
	
	if(img == undefined)
		image(mapImg_dark,0,0);
	else
		image(img,0,0);
	
	var cx = mercX(clon, zoom, mapX);
	var cy = mercY(clat, zoom, mapX);

	console.log(earthquakes.length);
	for(var i = 1; i < earthquakes.length; i++){
		var data = earthquakes[i].split(/,/);
		var quake = new Earthquake(data[0], data[1], data[2], data[3], data[4]);
		var mag = quake.mag * 3;
		var p = new QuakePoint(mercX(quake.lon, zoom, mapX) - cx, mercY(quake.lat, zoom, mapX) - cy, mag, mag);
		
		stroke(0, 0, 0);
		fill(255, 0, 0, 200);
		ellipse(p.x, p.y, p.w, p.h);
	}
	
	cvs.parent("map"); 
	cvs.class("map_canvas");
	cvs.id("map-cvs");
}

function draw(){

}

function windowResized(){
	
} 

