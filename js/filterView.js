var DEBUG = true;

function log(something){
	if(DEBUG){
		console.log(something);
	}
}

//TILES CREATION	
var FilterView = function (){
	'use-strict';

	//VIEWBOX SETTINGS
	this.viewBoxWidth = 800;
	this.viewBoxHeight = this.viewBoxWidth * 1.0;
	this.offsetYViewBox = -40;

	this.observerList = [];//list of observer to notify when filterView is changed by the user

	this.wordBatchSize = 3;
	this.lastWordIndex = 0;

	var filterViewLayout = this;

	var heightSvgList = '70'; //NB it's a percetage!
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
	.attr('cursor', 'pointer')
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
.attr("viewBox", "0 "+ this.offsetYViewBox +" "+ this.viewBoxWidth+" "+this.viewBoxHeight) //VIEWBOX OF THE filtermap
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
.attr('height', heightSvgList+ "%")	
.attr('y', '10')
.attr('x', '10');

//add container for filters 
this.svgFilters =this.g.append('svg')
.attr('id', 'svg-filter')	
.append('g');

this.svgFilters
.append('rect')
.attr('id', 'rect-filter')	
.attr('height', (100 - heightSvgList - 5) + "%") //5 is the percentage of empty space at the bottom of the filters
.attr('y', (heightSvgList-(-2))+ "%") //add 2 percent for padding
.attr('x', '10');

var landedFilterOn = false;

//add landed filter
this.svgFilters
.append('text')
.attr('text-anchor', 'middle')
.attr('dominant-baseline', 'central')
.attr('font-size', 20)
.attr('pointer-events','all' )
.attr('x', this.viewBoxWidth*0.9 )
.attr('y', (heightSvgList * 1.1)+ "%")
.text('LANDED');

this.svgFilters
.append('text')
.attr('text-anchor', 'middle')
.attr('dominant-baseline', 'central')
.attr('font-family', 'FontAwesome')
.attr('font-size', 20)
.attr('cursor', 'pointer')
.attr('x', this.viewBoxWidth*0.82 )
.attr('y', (heightSvgList * 1.1)+ "%")
.on('click',toggleLanded)
.text(function() { return '\uf096'; });

function toggleLanded(){
	//toggle filtet
	landedFilterOn = !landedFilterOn;
	log('landed filter'+ landedFilterOn);

	//notify
	filterViewLayout.notifyAll(new ToggleFilter('L',landedFilterOn));

	//change icon
	d3.select(this).text(function() { return (landedFilterOn)?'\uf046':'\uf096'; });
}

//add select all
this.svgList
.append('text')
.attr('text-anchor', 'middle')
.attr('dominant-baseline', 'central')
.attr('font-family', 'FontAwesome')
.attr('font-size', 20)
.attr('cursor', 'pointer')
.attr('x', this.viewBoxWidth*0.05 )
.attr('y', this.viewBoxHeight*0.04)
.on('click',toggleSelectAll)
.text(function() { return '\uf096'; });
var selectAllOn = false;
function toggleSelectAll(){
	//toggle filtet
	selectAllOn = !selectAllOn;
	log('selectAll filter'+ selectAllOn);

	//notify
	filterViewLayout.notifyAll(new ToggleFilter('L',selectAllOn)); // TODO TROVARE UN CODICE PER IL SELECT ALL

	//change icon
	d3.select(this).text(function() { return (selectAllOn)?'\uf046':'\uf096'; });
}

//create COLUMNS OF LIST(name,date,maxSpeed)

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
	.attr('y', this.viewBoxHeight*0.05)
	.attr('cursor', 'pointer')
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
	.attr('y', this.viewBoxHeight * heightSvgList * 0.0095)
	.attr('cursor', 'pointer')
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

    	//reset list to the beginning i.e. slide to the beginning
    	filterViewLayout.lastWordIndex = 0;
    	
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

    this.notifyAll= function(newFilter){
    	log('filter modified notifying...');
    	for(var o in this.observerList){
    		o.filterUpdated(newFilter); // I DO EXPECT TO FIND THIS METHOD IN THE CONTROLLER
    	}
    }

	//**UTILITY**//

	//the function return the y value of the text accordingly to its index
	function yValue(index){
		return index * 100 + 130;
	}

};

FilterView.prototype.modelUpdated = function(data){	
	log('model updated received');	
	this.update(data);
}

FilterView.prototype.addObserver = function(observer){
	log('observer added');
	this.observerList.push(observer);
}


f = new FilterView();

umbertoData = hurricanes["hurricanes"].slice(1000,1020);
f.modelUpdated(umbertoData);
//setTimeout(function(){f.modelUpdated(hurricanes["hurricanes"].slice(1030,1040))}, 5500);
//f.modelUpdated(['primo','secondo','terzo','quarto','quinto',"sestads",'ancora','dipiue','ancoramiatuo','ultimo!!!']);





