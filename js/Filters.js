var ThresholdFilter = function(attribute,threshold,filterFunction){
	this.name = attribute;
	this.threshold = threshold;
	this.filterFunction = filterFunction;

	var from = (filterFunction ==='max') ? -Infinity : threshold;
	var to = (filterFunction === 'max') ? threshold : +Infinity;
	var myRangeFilter = new RangeFilter(attribute,from,to,'range');

	return myRangeFilter;
}

var RangeFilter = function(attribute,from,to,filterFunction){ //filterFunction is 'range'
	this.name = attribute;
	this.from = from;
	this.to = to;
	this.filterFunction = filterFunction;
}

var ToggleFilter = function(attribute,buttonStatus){
	this.name = attribute;
	this.buttonStatus = buttonStatus;
}

var TopFilter = function(attribute, number){
this.name = attribute;
this.number = number;
}

var BottomFilter = function(attribute, number){
this.name = attribute;
this.number = number;
}

var HurricaneNameFilter = function(name,filterFunction){ // 'add' or 'remove' or 'addAll' or 'removeAll'
	this.name = attribute;
}
