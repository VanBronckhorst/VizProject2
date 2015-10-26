var Model = function() {
	
	this.globalData = hurricanes[ "hurricanes" ].slice(1772,1792);

	this.currentData = [];

	this.visualizedData = [];

	this.observers = []; 

	this.filters = {}; // holds the filters currently active "attrName": filterObject

	this.filter = new Filter();

	this.init = function() {
		this.currentData = this.globalData;
		this.visualizedData = this.globalData;
		this.notifyAll( this.currentData, this.visualizedData );
	};

	// add observer
	this.addObserver = function( obj ) {
		console.log( 'added new observer' );
		this.observers.push( obj );
	};

	// remove observer
	this.removeObserver = function( obj ) {
		for( var i = 0, len = this.observers.length; i < len; ++i ) {
      		if( this.observers[ i ] === obj ) {
        		this.observers.splice( i, 1 );
        		console.log( 'removed existing observer' );
        		return true;
      		}
    	}
    return false;
	};

	// notify observers
	this.notify = function ( observer, data1, data2 ) {
		observer.modelUpdated( data1, data2 );
	};

	this.notifyAll = function ( data1, data2 ) {
		for ( var i = 0, len = this.observers.length; i < len; ++i ) {
			this.notify( this.observers[ i ], data1, data2 );
		}
	};

	// filters the current dataset accordingly to filterObject  
	this.filterCurrent = function( filterObject ) {
		var oldFilter = this.filters[ filterObject.name ];
		if ( oldFilter === undefined || this.filter.isSubset( filterObject, oldFilter ) ) {
			// if the attribute hasn't been previously filtered on or the older filter was coarser
			this.filters[ filterObject.name ] = filterObject;
			this.currentData = this.filter.filterCurrent( filterObject, this.currentData );
			this.visualizedData = this.currentData;
		} else {
			// need to refilter the whole dataset
			this.currentData = this.globalData;
			this.filters[ filterObject.name ] = filterObject;
			for ( var k in this.filters ) {
				this.currentData = this.filter.filterCurrent( this.filters[k], this.currentData );
			}
			this.visualizedData = this.currentData;
		}
		// notify observers
		this.notifyAll( this.visualizedData, this.currentData );
		// allow chain calls
		return this;
	};

	// filters the visualized dataset accordingly to filterObject
	this.filterVisual = function ( filterObject ) {
		this.visualizedData = this.filter.filterVisual( filterObject, this.visualizedData, this.currentData );
		this.notifyAll( this.visualizedData, this.currentData );
		return this;
	};
};
