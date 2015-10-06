//TILES CREATION	
var filterView = function (){
	'use-strict';

	this.viewBoxWidth = 800;
	this.viewBoxHeight = 600;

	var filterViewLayout = this;


	//MAP SET UP - MOCK UP

	//INIT SECTION - Initiate the DIV for the map
	this.mapDiv = d3.select("body").append("div").attr("id","map").attr("class","map-div");
	
	//INITIATE THE MAP	
	this.map = L.map('map').setView([28.0, -94.0], 5);		
	
	//TILES CREATION	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'vanbronckhorst.ncgpejmm',
		accessToken: 'pk.eyJ1IjoidmFuYnJvbmNraG9yc3QiLCJhIjoiYjgyYTRhNjY0YzYxNDQ2ZWUzN2U5ZGFjNWFmMDI4OGYifQ.KUupQiTEuAkdC-WJgXZ7kA'
	})	    
	.addTo(this.map);

//****END MOCK-UP
this.filterViewDiv = d3.select('#map').append('div')
.attr('id','filterView' )
.attr('class','filterView');
//****CODE TO DISABLE DRAGGING WHEN HOVER FILTER VIEW
// Disable dragging when user's cursor enters the element
this.filterViewDiv[0][0].addEventListener('mouseover', function () {
	filterViewLayout.map.dragging.disable();
});

// Re-enable dragging when user's cursor leaves the element
this.filterViewDiv[0][0].addEventListener('mouseout', function () {
	filterViewLayout.map.dragging.enable();
});
//******///

this.filterViewDiv
.on('click',resizeFilterView);

var toggle = true;
function resizeFilterView(){
	var val = (toggle)? 1 : 50;
	$('#filterView').animate({'width' : val+'%'}, { duration:750,		
		complete: function() {
			toggle = !toggle;
		}
	});}


};

filterView();

