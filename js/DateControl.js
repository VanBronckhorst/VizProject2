var DateControl = L.Control.extend({
    options: {
        position: 'topright'
    },
    initialize: function (time,options /*{ data: {...}  }*/) {
    // constructor
    this.time=time;
    L.Util.setOptions(this, options);
	},

    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'date-control');
		
		this.div = d3.select(container);
		//Calculating the right size from the body size
		this.w= parseInt(d3.select("body").style("width"))*0.15+"px";
		this.h= parseInt(d3.select("body").style("height"))*0.05+"px";
		this.div.style("width",this.w).style("height",this.h);
		
		this.svg = this.div.append("svg").attr("class","control-svg").attr("viewBox","0 0 200 10").attr("preserveAspectRatio","xMidYMid meet")
		this.svg.append("text").attr("dominant-baseline","hanging").attr("class","time-control-text").text(this.time.toLocaleDateString()+ " " + this.time.toLocaleTimeString());
        // ... initialize other DOM elements, add listeners, etc.

        return container;
    },
    setNewDate: function(newDate){
	    this.time=newDate;
	    this.updateDisplay();
    },
    updateDisplay: function(){
	    this.svg.select("text").text(this.time.toLocaleDateString()+ " " + this.time.toLocaleTimeString());
    }
});