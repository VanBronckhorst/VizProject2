function PlayView(map,id){
	var that=this;
	this.map = map;
	
	this.container = d3.select("body").append("div").attr("class","play-view-container");
	
	this.playButton = this.container.append("div")
									.attr("class","play-view-button")
									.on("click",function(){
														   that.map.playSelected()});
	this.playButton = this.container.append("div")
									.attr("class","stop-view-button")
									.on("click",function(){
														   that.map.stop()});
}