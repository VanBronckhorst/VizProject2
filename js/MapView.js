function MapView(){
	
	//INIT SECTION - Initiate the DIV for the map
	d3.select("body").append("div").attr("id","map").attr("class","map-div");
	
		 	
	
	//TILES CREATION	
 	this. geoTile =L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'vanbronckhorst.ncgpejmm',
	    accessToken: 'pk.eyJ1IjoidmFuYnJvbmNraG9yc3QiLCJhIjoiYjgyYTRhNjY0YzYxNDQ2ZWUzN2U5ZGFjNWFmMDI4OGYifQ.KUupQiTEuAkdC-WJgXZ7kA'
	})
	
	this.darkTile =L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'vanbronckhorst.nj9gh0od',
	    accessToken: 'pk.eyJ1IjoidmFuYnJvbmNraG9yc3QiLCJhIjoiYjgyYTRhNjY0YzYxNDQ2ZWUzN2U5ZGFjNWFmMDI4OGYifQ.KUupQiTEuAkdC-WJgXZ7kA'
	})
			
	this.tiles = [this.geoTile,this.darkTile]
	this.baseMaps = {
    "Geo Map": this.geoTile,
    "Dark Map": this.darkTile
	};	
	
	//INITIATE THE MAP	
	this.map = L.map('map',{layers: this.tiles}).setView([28.0, -94.0], 5);		
	L.control.layers(this.baseMaps,null,{position:"topleft"}).addTo(this.map);
/*
			var popup = L.popup();

			function onMapClick(e) {
			    popup
			        .setLatLng(e.latlng)
			        .setContent("You clicked the map at " + e.latlng.toString())
			        .openOn(map);
			}
			
			map.on('click', onMapClick);
			
			var hu=hurricanes["hurricanes"][3];
			
			for (var i = 0;i<hu['points'].length;i++){
				point = hu['points'][i]
				var circle = L.circle([point["lat"],point["lon"] ], 500, {
							    color: 'yellow',
							    fillColor: 'yellow',
							    fillOpacity: 0.5
							}).addTo(map);
			}
*/
	// MAP Variables
	this.dataDisplayed = hurricanes["hurricanes"].slice(1,20);
	this.visualizationModes=["LINES","COMPARE","PLAY"]
	this.visualizationMode = this.visualizationModes[0]
	
	
	this.displayLines = function(){
		for (var hurricaneI in this.dataDisplayed){
			var hurricane = this.dataDisplayed[hurricaneI];
			for (var pointI in hurricane['points']){
				
				var point = hurricane['points'][pointI];
				if (pointI==0){
					
				}else{
					L.polyline([[point["lat"],point["lon"]],[hurricane['points'][pointI-1]["lat"],hurricane['points'][pointI-1]["lon"]]],{color: "yellow"}).addTo(this.map)
				}
			}
		}
	}
	
	this.displayLines();
	
	
	this.modelUpdated= function(data){
		this.dataDisplayed = data
	}		
	

}