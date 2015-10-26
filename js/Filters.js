var ThresholdFilter = function(attribute,threshold,filterFunction){
	this.name = attribute;
	this.threshold = threshold;
	this.function = filterFunction;

	var from = (filterFunction ==='max') ? -Infinity : threshold;
	var to = (filterFunction === 'max') ? threshold : +Infinity;
	var myRangeFilter = new RangeFilter(attribute,from,to,'range');

	return myRangeFilter;
}

var RangeFilter = function(attribute,from,to,filterFunction){ //filterFunction is 'range'
	this.name = attribute;
	this.from = from;
	this.to = to;
	this.function = filterFunction;
}

var ToggleFilter = function(attribute,buttonStatus,filterFunction){
	this.name = attribute;
	this.value = buttonStatus;
	this.function = filterFunction;
}

var SliceFilter = function(attribute, number,fitlerFunction){// 'top' or 'bottom'
	this.name = attribute;
	this.number = number;
	this.function = fitlerFunction;
}


var HurricaneNameFilter = function(name,filterFunction){ // 'add' or 'remove' or 'addAll' or 'removeAll'
	this.name = name;
	this.function = filterFunction;
}
