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

	this.lists = []; //has all the list displayed: the name of the hurricanes, the speeds

	//data initially is empty
	this.data = []; 
	
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
	.attr('x', 90 )
	.attr('y', 300)
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

var listCreator = new ListCreator();

this.list = listCreator.createList(this.svgList,'NAME');
this.listSpeed = listCreator.createList(this.svgList,'N');

this.lists.push({'list':this.list, 'attribute' : 'name'},{'list':this.listSpeed,'attribute':'n'});


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

	
		//update the lastWord Index accordingly to the direction
		filterViewLayout.lastWordIndex = (direction === 'down') ? 
		d3.min([filterViewLayout.data.length - filterViewLayout.wordBatchSize ,filterViewLayout.lastWordIndex + filterViewLayout.wordBatchSize])
		:d3.max([0,filterViewLayout.lastWordIndex - filterViewLayout.wordBatchSize]);
		
		//calculare the upperIndex for slice
		// the upper is either the max length of data or the last index plust the batch size
		var upperIndexSlice = d3.min([filterViewLayout.data.length,filterViewLayout.lastWordIndex + filterViewLayout.wordBatchSize]);
		
		filterViewLayout.lists.forEach(function(d){updateValuesOf(d);})		

		function updateValuesOf(list){
			var attribute = list['attribute'];
			list = list['list'];

		//bind new data 
		list = list
		.data(filterViewLayout.data.slice(filterViewLayout.lastWordIndex,upperIndexSlice));		

		//and remove old elements if any
		list
		.exit()
		.remove();

		//move all elements down or up
		list
		.attr('y', function(d,i){
			return (direction === 'down') ? 
			filterViewLayout.viewBoxHeight*0.7 :
			filterViewLayout.viewBoxHeight*0.1;
		});	

    	// move all the elements to their position
    	list
    	.transition()    	
    	.attr('y', function(d,i){
    		return yValue(i) ;
    	})
    	.text(function(d,i){
    		return d[attribute];
    	})
    	.attr('color','black')
    	.attr('font-size',20 );
    }

}

    //function to update list when model is updated
    this.update = function(data){
    	//change data
    	this.data = data;
    	updateSingleList(filterViewLayout.lists[0]);

    	updateSingleList(filterViewLayout.lists[1]);

    	function updateSingleList(list){
    		var attribute = list['attribute'];
    		list = list['list'];

    		list = list
    		.data(filterViewLayout.data.slice(0,this.wordBatchSize));

    		//update
    		list  	
    		.text(function(d,i){
    			return d[attribute];
    		})
    		.attr('y', function(d,i){
    			return yValue(i);
    		});	
    	}
    }

	//**UTILITY**//

	//the function return the y value of the text accordingly to its index
	function yValue(index){
		return index * 100 + 130;
	}

};

FilterView.prototype.modelUpdated = function(data){		
	this.update(data);
}


f = new FilterView();

umbertoData = hurricanes["hurricanes"].slice(1000,1020);
f.modelUpdated(umbertoData);
//f.modelUpdated(['primo','secondo','terzo','quarto','quinto',"sestads",'ancora','dipiue','ancoramiatuo','ultimo!!!']);





