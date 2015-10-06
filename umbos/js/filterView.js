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


//appending arrow to control opening and closing filterView
d3.select('#map').append('div')
.attr('id', 'divArrowFilter')
.append('svg')
.attr("viewBox", "0 0 "+ this.viewBoxWidth+" "+this.viewBoxHeight)
.style('width','100%')
.style('height', '100%')
.append('text')
.attr('dominant-baseline', 'central')
.attr('font-family', 'FontAwesome')
.attr('font-size', 600)
.attr('x', 0 )
.attr('y', 100)
.attr('fill', 'black')
.attr('id', 'arrowResizeFilter')
.on('click',resizeFilterView)
.text(function(d) { return '\uf053'; });


var toggle = true;
function resizeFilterView(){
	var widthVal = (toggle)? 1 : 25;
	var heightVal = (toggle)? 100 : 100;

	$('#filterView').animate({'width' : widthVal+'%', 'height': heightVal+'%'}, { 
		duration:750,	
		start: function(){
			if(toggle){
				$('#divArrowFilter').animate({
					left: '0'
				}, 'slow');
			}else{
				$('#divArrowFilter').animate({
					left: '25%'
				}, 'slow');
			}
		},
		complete: function() {
			if(toggle){
			//arrow change direction to right
			d3.select('#arrowResizeFilter')
			.text(function() { return '\uf054'; });
		}else{
			//arrow change direction to left
			d3.select('#arrowResizeFilter')
			.text(function() { return '\uf053'; });
		}
		toggle = !toggle;
	}
});
}

var svg = this.filterViewDiv
.append("svg")
.attr("viewBox", "0 0 "+ this.viewBoxWidth+" "+this.viewBoxHeight) //VIEWBOX OF THE filtermap
//.attr('preserveAspectRatio','none' )
.style('width','100%')
.style('height', '100%');


//add title text
this.g = svg.append('g');

this.g.append('text')
.attr('class','title-controls')	
.text('CONTROLS')
.attr('y', '0')
.attr('x', '250');



//add container svg for lists
this.svgList = this.g.append('svg')
.attr('id', 'svg-list')	
.append('g');

this.svgList
.append('rect')
.attr('id', 'rect-list')	
.attr('y', '10')
.attr('x', '10');

var dati = ['unomila','duemila','tremila'];
var datiNuovi=['cioacioa','giaiagai'];

	//add words
	this.list = this.svgList
	.append('g')
	.selectAll("text")
	.data(dati)
	.enter()
	.append('text')
	.text(function(d,i){
		return d;
	})
	.attr('y', function(d,i){
		return i * 100+130;
	})
	.attr('x', 30)
	.attr('color','black')
	.attr('font-size',20 );

	//add buttons
	this.svgList
	.append('text')
	.attr('text-anchor', 'middle')
	.attr('dominant-baseline', 'central')
	.attr('font-family', 'FontAwesome')
	.attr('font-size', 20)
	.attr('pointer-events','all' )
	.attr('x', 770 )
	.attr('y', 40)
	.on('click',slideList)
	.text(function(d) { return '\uf139'; });

	function slideList(){
		//unbind data
		filterViewLayout.list = filterViewLayout.list
		.data([]);
		
		//and remove old elements if any
		filterViewLayout.list
		.exit()
		.remove();

		//bind new data so that all the data to add is new
		filterViewLayout.list = filterViewLayout.list
		.data(datiNuovi);		

		// add new elements at the end of svg and update the list
		filterViewLayout.list = filterViewLayout.list
		.enter()		
		.append('text')
		.text(function(d,i){
			return d;
		})
		.attr('y', function(d,i){
			return 600;
		})
		.attr('x', 30)
		.attr('color','black')
		.attr('font-size',20 );	

    	// move all the elements to their position
    	filterViewLayout.list
    	.transition()
    	.text(function(d,i){
    		return d;
    	})
    	.attr('y', function(d,i){
    		return i * 100+130;
    	})
    	.attr('x', 30)
    	.attr('color','black')
    	.attr('font-size',20 );

    }


};


filterView();

