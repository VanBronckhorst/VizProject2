var ListCreator = function(){
	var numberOfListCreated = 0;
	var columnWidth = 180;
	var xOffset = 50;
	var titleY = 40;
	var valuesSize = 20;
	var titleSize = 25;
	var titleXOffset = 30;

	this.createList = function(place,name,wantCheckBox){
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
		.attr('x',function(){return xOffset+titleXOffset + columnWidth * numberOfListCreated;})
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
		.attr('x', function(d,i){return xOffset + titleXOffset + columnWidth * numberOfListCreated;})
		.attr('color','black')
		.attr('font-size',titleSize );

		//increase number of lists created
		numberOfListCreated++;

		return list;
	}

	this.checkBoxList = function(place){
			//add checkbox
			var listCheckBox = place
			.append('g')
			.selectAll("text")
			.data(['empy','empty','empty'])
			.enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'central')
			.attr('font-family', 'FontAwesome')
			.attr('font-size', 20)
			.attr('cursor', 'pointer')
			.attr('status','true')
			.attr('x', function(){return xOffset + columnWidth * numberOfListCreated - 15;} )
			.attr('y', function(d,i){
				return yValue(i) - 8;
			})			
			.text(function() { return '\uf046'; });	

			return listCheckBox;		

	}

	//the function return the y value of the text accordingly to its index
	function yValue(index){
		return index * 100 + 130;
	}
}