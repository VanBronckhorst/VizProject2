var ListCreator = function(){
	var numberOfListCreated = 0;
	var columnWidth = 180;
	var xOffset = 30;
	var titleY = 40;
	var valuesSize = 20;
	var titleSize = 25;

	this.createList = function(place,name){
		//add list texts
		var list = place
		.append('g')
		.selectAll("text")
		.data(['empy','empty','empty'])
		.enter()
		.append('text')
		.text(function(d){
			return d;
		})
		.attr('y', function(d,i){
			return yValue(i);
		})
		.attr('x',function(d,i){return xOffset + columnWidth * numberOfListCreated;})
		.attr('color','black')
		.attr('font-size',valuesSize );

		//add title 
		place
		.append('g')
		.append('text')
		.text(name)
		.attr('y', function(){
			return titleY;
		})
		.attr('x', function(d,i){return xOffset + columnWidth * numberOfListCreated;})
		.attr('color','black')
		.attr('font-size',titleSize );

		//increase number of lists created
		numberOfListCreated++;

		return list;
	}

	//the function return the y value of the text accordingly to its index
	function yValue(index){
		return index * 100 + 130;
	}
}