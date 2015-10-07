var DEBUG = true;

function log(something){
	if(DEBUG){
		console.log(something);
	}
}

//TILES CREATION	
var FilterView = function (){
	'use-strict';

	this.viewBoxWidth = 800;
	this.viewBoxHeight = 600;

	this.wordBatchSize = 3;
	this.lastWordIndex = 0;

	var filterViewLayout = this;


	
	//GRAB THE MAP	
	this.map = d3.select('#map'),	


	this.filterViewDiv = this.map.append('div')
	.attr('id','filterView' )
	.attr('class','filterView');


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


	//code to close and open the panel
	var toggle = true;
	function resizeFilterView(){
		var widthVal = (toggle)? 0 : 25;
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

//create svg for filterView
var svg = this.filterViewDiv
.append("svg")
.attr("viewBox", "0 0 "+ this.viewBoxWidth+" "+this.viewBoxHeight) //VIEWBOX OF THE filtermap
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

this.data = []; //data initially is empty

	//add words
	this.list = this.svgList
	.append('g')
	.selectAll("text")
	.data(this.data)
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

	//add button arrow up
	this.svgList
	.append('text')
	.attr('text-anchor', 'middle')
	.attr('dominant-baseline', 'central')
	.attr('font-family', 'FontAwesome')
	.attr('font-size', 20)
	.attr('pointer-events','all' )
	.attr('x', 770 )
	.attr('y', 40)
	.on('click',function(){slideList('up');})
	.text(function(d) { return '\uf139'; });

	//add button arrow down
	this.svgList
	.append('text')
	.attr('text-anchor', 'middle')
	.attr('dominant-baseline', 'central')
	.attr('font-family', 'FontAwesome')
	.attr('font-size', 20)
	.attr('pointer-events','all' )
	.attr('x', 770 )
	.attr('y', 400)
	.on('click',function(){slideList('down');} )
	.text(function(d) { return '\uf13a'; });


	//function to make the hurricane list slide up or down
	function slideList(direction){ //direction is up or down

		//if the user ask to slide down when there are no more hurricane
		//or to slide up when the list is at the beginning
		//return
		if(direction === 'down' && filterViewLayout.lastWordIndex == filterViewLayout.data.length - filterViewLayout.wordBatchSize ||
			direction === 'up' && filterViewLayout.lastWordIndex == 0){
			return;
		}

		//unbind data
		filterViewLayout.list = filterViewLayout.list
		.data([]);
		
		//and remove old elements if any
		filterViewLayout.list
		.exit()
		.remove();

		//update the lastWord Index accordingly to the direction
		filterViewLayout.lastWordIndex = (direction === 'down') ? 
		d3.min([filterViewLayout.data.length - filterViewLayout.wordBatchSize ,filterViewLayout.lastWordIndex + filterViewLayout.wordBatchSize])
		:d3.max([0,filterViewLayout.lastWordIndex - filterViewLayout.wordBatchSize]);
		
		//calculare the upperIndex for slice
		// the upper is either the max length of data or the last index plust the batch size
		var upperIndexSlice = d3.min([filterViewLayout.data.length,filterViewLayout.lastWordIndex + filterViewLayout.wordBatchSize]);
		
		
		//bind new data so that all the data to add is new
		filterViewLayout.list = filterViewLayout.list
		.data(filterViewLayout.data.slice(filterViewLayout.lastWordIndex,upperIndexSlice));		


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

    //function to update list when model is updated
    this.update = function(data){
    	//change data
    	this.data = data;

    	//unbind data
    	filterViewLayout.list = filterViewLayout.list
    	.data([]);

		//and remove old elements if any
		filterViewLayout.list
		.exit()
		.remove();

		//bind new data so that all the data to add is new
		//just partially
		filterViewLayout.list = filterViewLayout.list
		.data(this.data.slice(0,this.wordBatchSize));		


		// add new elements at svg and update the list
		filterViewLayout.list = filterViewLayout.list
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
	}

};

FilterView.prototype.modelUpdated = function(data){		
	this.update(data);
}


f = new FilterView();
f.modelUpdated(['primo','secondo','terzo','quarto','quinto',"sestads",'ancora','dipiue','ancoramiatuo','ultimo!!!']);





