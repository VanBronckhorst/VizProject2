

function MapView(){
	var that=this;
	//INIT SECTION - Initiate the DIV for the map
	d3.select("body").append("div").attr("id","map").attr("class","map-div");
	this.warpOverlay = d3.select("#map").append("div").attr("class","warp-overlay").style("visibility","hidden").text("Warp")
		 	
	
	//TILES CREATION	
	
	
	this.pirateTile= L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'vanbronckhorst.nm2ecd0l',
	    accessToken: 'pk.eyJ1IjoidmFuYnJvbmNraG9yc3QiLCJhIjoiYjgyYTRhNjY0YzYxNDQ2ZWUzN2U5ZGFjNWFmMDI4OGYifQ.KUupQiTEuAkdC-WJgXZ7kA'
	})
	
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
    "<g class = 'control-layer-text'>Geo Map</g>": this.geoTile,
    "<g class = 'control-layer-text'>Dark Map</g>": this.darkTile,
    "<g class = 'control-layer-text'>Pirates ;)</g>":this.pirateTile
	};	
	
	//INITIATE THE MAP	
	this.map = L.map('map',{layers: [this.darkTile]}).setView([28.0, -94.0], 5);		
	L.control.layers(this.baseMaps,null,{position:"topleft"}).addTo(this.map);

	// MAP Variables
	this.dataDisplayed = hurricanes["hurricanes"].slice(hurricanes["hurricanes"].length-20,hurricanes["hurricanes"].length-1);
	this.visualizationModes=["LINES","COMPARE","PLAY"]
	this.visualizationMode = this.visualizationModes[0]
	//Holds The Displayed DATE and Time in PLAY Mode
	this.mapTime= new Date();
	this.dateControl = new DateControl(this.mapTime);
	this.dateControl.addTo(this.map);
	this.speed = 12;// hours per second
	this.animationUpdate=100;
	this.usingTimeWarp=true;
	this.timeModel = new TimeAccelleratorModel();
	this.hurricaneLayer = L.layerGroup();
	this.hurricaneLayer.addTo(this.map);
	this.markers = {}
	this.trails={}
	this.speedScale = d3.scale.linear().domain([20,80,140]).range(["#DEDE5F","#DEA35F","#F04337"])
	
	this.playView = new PlayView(this,"PlayView") 
	
	
	
	this.displayLines = function(){
		this.hurricaneLayer.clearLayers();
		for (var hurricaneI in this.dataDisplayed){
			var hurricane = this.dataDisplayed[hurricaneI];
			for (var pointI in hurricane['points']){
				
				var point = hurricane['points'][pointI];
				if (pointI==0){
					this.hurricaneLayer.addLayer(L.circle([point["lat"],point["lon"]],5,{color:"yellow",fillColor: "yellow",
							    fillOpacity: 0.5}));
				}else{
					this.hurricaneLayer.addLayer(L.polyline([[point["lat"],point["lon"]],[hurricane['points'][pointI-1]["lat"],hurricane['points'][pointI-1]["lon"]]],{color: "yellow"}));
				}
			}
		}
	}
	
	this.compareLines = function(){
		this.hurricaneLayer.clearLayers();
		for (var hurricaneI in this.dataDisplayed){
			var hurricane = this.dataDisplayed[hurricaneI];
			for (var pointI in hurricane['points']){
				
				var point = hurricane['points'][pointI];
				if (pointI==0){
					this.hurricaneLayer.addLayer(L.circle([point["lat"],point["lon"]],5,{color:"yellow",fillColor: this.speedScale(point["maxSpeed"]),
							    fillOpacity: 0.5}));
				}else{
					var line=L.polyline([[point["lat"],point["lon"]],[hurricane['points'][pointI-1]["lat"],hurricane['points'][pointI-1]["lon"]]],{color: this.speedScale(point["maxSpeed"])}).on("click",function(e){ that.hurricaneSelected(e.target.hurr)})
					line.hurr=hurricane;
					this.hurricaneLayer.addLayer(line);
				}
			}
		}
	}
	
	this.hurricaneSelected = function(h){
		console.log(h)
	}
	
	this.displayFrameTime = function(d){
		shown = 0
		
		for (var hurricaneI in this.dataDisplayed){
			var hurricane = this.dataDisplayed[hurricaneI];
			var pointToShow = hurricanePositionAt(hurricane,d);
			if (pointToShow!= null){
				if (this.markers[hurricaneI]){
						shown +=1;
						this.markers[hurricaneI].setLatLng([pointToShow["lat"],pointToShow["lon"] ]);
						this.markers[hurricaneI].setType(pointToShow["type"]);
						
					}else{
						shown +=1;
						this.markers[hurricaneI] =L.hurricaneMarker([pointToShow["lat"],pointToShow["lon"] ],pointToShow["type"]);
						this.hurricaneLayer.addLayer(this.markers[hurricaneI]);	
						
					}
				if (this.trails[hurricaneI]){
					addTrail(this.trails[hurricaneI],pointToShow)
				}else{
					this.trails[hurricaneI]=L.layerGroup();
					this.trails[hurricaneI].addTo(this.map);
					addTrail(this.trails[hurricaneI],pointToShow)
				}
					
			}else{
				if (this.markers[hurricaneI]){
					this.hurricaneLayer.removeLayer(this.markers[hurricaneI]);
					this.markers[hurricaneI]=null;
					layerManager.removeGroup(this.trails[hurricaneI])
					this.map.removeLayer(this.trails[hurricaneI]);
					this.trails[hurricaneI]=null;
				}	
			}
		}
		return shown;
	}
	
	this.playFrom = function(start){
		this.hurricaneLayer.clearLayers();
		this.markers={};
		this.visualizationMode=["PLAY"];
		this.displayFrameTime(start);
		this.timeModel.init(start,this.speed)
		if (this.timer){
			clearInterval(this.timer)
		}
		this.timer = setInterval(this.updateTime, this.animationUpdate);
		
	}
	
	this.setMapTime = function (d){
		that.mapTime=d;
		that.dateControl.setNewDate(that.mapTime);
	}
	
	
	this.updateTime = function(){
		var count = 0
		
			
			that.setMapTime(that.timeModel.getTime());
			count = that.displayFrameTime(that.mapTime)
			if (that.mapTime>that.stopTime){
				clearInterval(that.timer)
				
			}
			
			if (that.usingTimeWarp){
				if (count==0){
					that.timeWarp();
					count = that.displayFrameTime(that.mapTime)
					if (that.mapTime>that.stopTime){
						clearInterval(that.timer)
						count=1;
					}
				}else{
					that.warpOverlay.style("visibility","hidden")
				}
			}
		
	}
	
	this.timeWarp = function(){
		// MAybe here print something to say we are warping
		this.warpOverlay.style("visibility","visible")
		that.timeModel.timeWarp();
		that.setMapTime(that.timeModel.getTime());
		
	}
	
	this.playSelected = function(){
		this.mapTime = firstPointInHurricanes(this.dataDisplayed)
		this.stopTime = lastPointInHurricanes(this.dataDisplayed)
		this.playFrom(this.mapTime);
		
	} 
	
	this.pause = function(){
		clearInterval(that.timer);
	}
	
	this.resume = function(){
		that.playFrom(that.mapTime);
	}
	
	this.stop = function(){
		clearInterval(this.timer);
		
		this.setMapTime(new Date());
		
		this.hurricaneLayer.clearLayers();
		
		for (t in this.trails){
			if (this.trails[t]){
				layerManager.removeGroup(this.trails[t])
				this.map.removeLayer(this.trails[t]);
				
			}
		}
		this.trails={}
		this.visualizationMode=["LINES"];
		this.compareLines();

	}
	
	//this.playSelected();
	//this.displayLines();
	this.compareLines();
	
	this.modelUpdated= function(data){
		this.dataDisplayed = data
		this.stop();
		this.compareLines();
		
		//TODO Look at stuff interrupted
	}		
	

}