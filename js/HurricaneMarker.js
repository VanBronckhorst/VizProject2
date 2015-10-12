//Adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/rotating-controlling-marker/

var hurrIcon= new L.Icon({iconUrl:'./images/hurr.png',iconSize: [30, 30]});
var nonHurrIcon= new L.Icon({iconUrl:'./images/nonHurr.png',iconSize: [30, 30]});

L.HurricaneMarker = L.Marker.extend({
  
  options: { angle: 0,
	  		icon: this.type==" HU"?hurrIcon:nonHurrIcon
			},
			
  _setPos: function(pos,type) {
	  
    L.Marker.prototype._setPos.call(this, pos);
    if (L.DomUtil.TRANSFORM) {
      // use the CSS transform rule if available
      this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
    } else if (L.Browser.ie) {
      // fallback for IE6, IE7, IE8
      var rad = this.options.angle * L.LatLng.DEG_TO_RAD,
      costheta = Math.cos(rad),
      sintheta = Math.sin(rad);
      this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
        costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
    }
    
   
  },
  
  initialize: function(pos,type,options){
	  this.type=type;
	  L.Marker.prototype.initialize.call(this, pos);
	  var that=this;
	  this.timer = setInterval(function(){
		  									
		  									that.options.angle += -0.1 * (180 / Math.PI);
		  									that.setLatLng(that.getLatLng());
	  									 }, 20) 
	  
	  
  },
  
  onRemove: function(map){
	  
	  L.Marker.prototype.onRemove.call(this,map);
	  clearInterval(this.timer);
	  
  },
  
  setType: function(type){
	   if (type!= this.type){
	    
	    this.type=type;
	    this.setIcon(this.type==" HU"?hurrIcon:nonHurrIcon);
		}
  }
  
  
});

L.hurricaneMarker = function(pos, options) {
    return new L.HurricaneMarker(pos, options);
    
};

var color34 = "#CEEBF5" 
var z34=2000;
var z50=3000;
var z64=4000;
var color50 = "#9BCBF2"
var color64 = "#326DED"
var l;
var l34;

function addTrail(group,point){
	if( point["34NE"]| point["34NW"]|point["34SE"]| point["34SW"]){
		r= Math.max(point["34NE"], point["34NW"],point["34SE"], point["34SW"]) * 1852;
		l34=L.circle([point["lat"],point["lon"] ],r,{fillColor : color34,fillOpacity : 0.1,stroke:false})
		group.addLayer(l34);
		layerManager.add(l34, 1)
	}
	if( point["50NE"]| point["50NW"]|point["50SE"]| point["50SW"]){
		r= Math.max(point["50NE"], point["50NW"],point["50SE"], point["50SW"]) * 1852;
		l=L.circle([point["lat"],point["lon"] ],r,{fillColor : color50,fillOpacity : 0.1,stroke:false})
		group.addLayer(l);
		layerManager.add(l, 2)
	}
	if( point["64NE"]| point["64NW"]|point["64SE"]| point["64SW"]){
		r= Math.max(point["64NE"], point["64NW"],point["64SE"], point["64SW"]) * 1852;
		l=L.circle([point["lat"],point["lon"] ],r,{fillColor : color64,fillOpacity : 0.1,stroke:false})
		group.addLayer(l);
		layerManager.add(l, 3)
	}
	
}


