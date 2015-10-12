var Controller = function(){
	//crea il model
	//var model = new Model();
	//crea la mappa
	var map = new MapView();

	//crea la filterView
	var filterView = new FilterView();

	umbertoData = hurricanes["hurricanes"].slice(1000,1020);
	filterView.modelUpdated(umbertoData);	
	
	this.filterUpdated = function(filter){
		//model.filter(filter);
	}
}

var controller = new Controller();