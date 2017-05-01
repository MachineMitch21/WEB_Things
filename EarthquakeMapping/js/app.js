
var nav_trig = document.getElementById("nav-trigger");
var nav_top = document.getElementsByClassName("nav-top")[0];
var view_criteria = document.getElementById("view-criteria");
var criteria_list = document.getElementsByClassName("criteria-list")[0];
var sub_crit_lists = document.getElementsByClassName("sub-criteria-list");
var crit_trigs = document.getElementsByClassName("criteria-trigger");
var arrows = document.getElementsByClassName("arrowImg");
var map_changers = document.getElementsByClassName("view_change");
var cvs = document.getElementById("map-cvs");

function init(){
	createListeners();
	init_defaults();
}

function createListeners(){
	nav_trig.onclick = showHideMenus;

	for(var i = 0; i < crit_trigs.length; i++){
		crit_trigs[i].onclick = showHideSubCriteria;
	}
	
	for(var i = 0; i < map_changers.length; i++){
		map_changers[i].onclick = changeImage;
	}
}

function init_defaults(){
	nav_trig.checked = false;
}
		
function showHideMenus(){
	if(nav_trig.checked == true){
		view_criteria.style.height = "242px";
		nav_top.style.height = "125px";
		
	}else{
		view_criteria.style.height = "0px";
		nav_top.style.height = "0px";
	}
}

function showHideSubCriteria(event){
	for(var i = 0; i < crit_trigs.length; i++){
		if(event.target == crit_trigs[i]){
			
			if(event.target.checked == true){
				setSubCheckedStyles(i);
			}else{
				setSubNotCheckedStyles(i);
			}
		}else{
			if(sub_crit_lists[i] != undefined && crit_trigs[i].checked != true)
				setSubNotCheckedStyles(i);
		}
		console.log(crit_trigs[i].checked);
		if(crit_trigs[i].checked == true){
			isChecked = true;
		}
	}
}

function setSubCheckedStyles(i){
	arrows[i].style.transform = "rotate(180deg)";
	
	$(".criteria-list").css("z-index", 20);
	
	if(sub_crit_lists[i] != undefined){
		sub_crit_lists[i].style.height = "auto";
		sub_crit_lists[i].style.visibility = "visible";
	}

}

function setSubNotCheckedStyles(i){
	arrows[i].style.transform = "rotate(0deg)";
	
	$(".criteria-list").css("z-index", 0);
	
	if(sub_crit_lists[i] != undefined){
		sub_crit_lists[i].style.height = "0px";
		sub_crit_lists[i].style.visibility = "hidden";
	}

}

function changeImage(event){
	if(event.target == map_changers[0]){
		setup(mapImg_satellite);
	}else if(event.target == map_changers[1]){
		setup(mapImg_dark);
	}else if(event.target == map_changers[2]){
		setup(mapImg_streets);
	}
		
}

if(window.addEventListener){
	window.addEventListener("load", init);
}else if(window.attachEvent){
	window.attachEvent("onload", init);
}