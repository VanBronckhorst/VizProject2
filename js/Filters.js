var ThresholdFilter = function(attribute,threshold,filterFunction){
	this.attribute = attribute;
	this.threshold = threshold;
	this.filterFunction = filterFunction;
}

var RangeFilter = function(attribute,from,to,filterFunction){
	this.attribute = attribute;
	this.from = from;
	this.to = to;
	this.filterFunction = filterFunction;
}

var ToggleFilter = function(attribute,buttonStatus){
	this.attribute = attribute;
	this.buttonStatus = buttonStatus;
}