//Adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/rotating-controlling-marker/


L.HurricaneMarker = L.Marker.extend({
  
  options: { angle: 0,
	  		icon: L.icon({
			    iconUrl: './images/hurr.png',
			    iconSize: [24, 24],
						}) 
			},
			
  _setPos: function(pos) {
	  
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
  
  initialize: function(pos,options){
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
	  
  }
  
  
});

L.hurricaneMarker = function(pos, options) {
    return new L.HurricaneMarker(pos, options);
    
};