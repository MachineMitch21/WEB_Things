
/*Helper functions for the map*/

//Turns a longitude value into a usable x value for our map image
function mercX(lon, zoom, mapX){
	lon = radians(lon);
	var a = (centralize(mapX) / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

//Turns a latitude value into a usable y value for our map image
function mercY(lat, zoom, mapX){
	lat = radians(lat);
	var a = (centralize(mapX) / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}

//This functions helps with uneven chunks when using different resolution images from mapbox that don't divide evenly by 512
//Mapbox cuts there images into 512px chunks
function centralize(map_width){
	var a = map_width / 512;
	var b = 256 / Math.floor(a);
	var c = b * (a - Math.floor(a));
	return 256 + c;
}