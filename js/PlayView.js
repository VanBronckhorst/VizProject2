function PlayView(map,id){
	var that=this;
	this.map = map;
	
	this.container = d3.select("body").append("div").attr("class","play-view-container");
	
	this.playButton = this.container.append("div")
									.attr("class","play-view-button")
									.on("click",function(){ d3this=d3.select(this);
															if (d3this.attr("class")=="play-view-button"){
														   												that.map.playSelected();
														   												d3this.attr("class","pause-view-button");
														   												return
														   												}
														   	if (d3this.attr("class")=="pause-view-button"){
														   												that.map.pause();
														   												d3this.attr("class","resume-view-button");
														   												return
														   												}	
														   	if (d3this.attr("class")=="resume-view-button"){
														   												that.map.resume();
														   												d3this.attr("class","pause-view-button");
														   												return
														   												}						
														  }
														   );
	this.stopButton = this.container.append("div")
									.attr("class","stop-view-button")
									.on("click",function(){
														   that.playButton.attr("class","play-view-button");
														   that.map.stop()});
}