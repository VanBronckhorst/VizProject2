// TODO adjust filterObject.values name

// provides a series of filtering functions
var filter = {

	filterCurrent: function( filterObject, currentData ) { // names to be adjusted

		switch( filterObject.function ) {
			case "sort": // serve davvero?
				return this.sort( filterObject.name, currentData, filterObject.values );
			case "range":
				return this.range( filterObject.name, currentData, filterObject.from, filterObject.to );
			case "top":
				return this.top( filterObject.name, currentData, filterObject.number );
			case "bottom":
				return this.bottom( filterObject.name, currentData, filterObject.number );		
			case "equal": // serve?
				return this.equal( filterObject.name, data, filterObject.values );
		}
	},

	filterVisual: function( filterObject, visualizedData, currentData ) {

		switch ( filterObject.function ) {
			case "add":
				return this.add( filterObject.name, visualizedData, currentData );
			case "remove":
				return this.remove( filterObject.name, visualizedData );
			case "addAll":
				return data;
			case "removeAll":
				return [];
		}
	},

	// returns the dataset data1 with entries added from data2 whose name === name
	add: function( name, data1, data2 ) {
		[].push.apply( data1, data2.filter( function( d ) {
			return d[ "name" ] === name;
		}) );
		return data1;
	},

	// returns the dataset without entries whose name === name
	remove: function( name, data ) {
		return data.filter( function( d ) {
			return d[ "name" ] !== name;
		})
	},

	// returns the datum for which attribute name is maximum
	max: function( name, data ) {
		var result,
			max = -Infinity,
			value;
		for ( var i = 0, length = data.length; i < length; ++i ) {
			value = data[ i ][ name ];
			if ( value > max ) {
				max = value;
				result = data[ i ];
			}
		}
		return result;
	},

	// returns the datum for which attribute name is minimum
	min: function( name, data ) {
		var result,
			min = Infinity,
			value;
		for ( var i = 0, length = data.length; i < length; ++i ) {
			value = data[ i ][ name ];
			if ( value < min ) {
				min = value;
				result = data[ i ];
			}
		}
		return result;
	},

	// TODO sistemare comparator
	// sorts the data on the attribute name, ascending if order > 0, descending if < 0 
	sort: function( name, data, order ) {
		// compares two values accordingly with type
		var compare = function( a, b ) {
			if ( typeof a === 'string' ) {
				return a > b ? 1 : -1;
			} else if ( typeof a === 'number' ) {
				return a - b;
			} // other eventual types
		};
		return data.sort( function( a, b ) {
			return order * compare( a[ name ], b[ name ] );
		});
	},

	// returns top n data w.r.t. attribute name sorted from highest to lowest
	top: function( name, data, n ) {
		return sort( name, data, 1 ).slice( -n ).reverse();
	},

	// returns bottom n data w.r.t. attribute name sorted from lowest to highest
	bottom: function( name, data, n ) {
		return sort( name, data, -1 ).slice( -n ).reverse();
	},

	// filters the data to those whose attribute name is between lower and upper ( assumes lower <= upper )
	range: function( name, data, lower, upper ) {
		return data.filter( function( d ) {
			return d[ name ] >= lower && d[ name ] <= upper;
		} );
	},

	// filters the data to those whose attribute name is equal to value
	equal: function( name, data, value ) {
		return data.filter( function( d ) {
			return d[ name ] === value;
		} );
	},

	// tests whether the first filter returns a subset of the second one
	isSubset: function( fObj1, fObj2 ) {
		if ( fObj1.name === fObj2.name ) {
			switch( fObj1.function ) {
				case "sort":
					return  fObj1.values === fObj2.values;
				case "range":
					return fObj1.values[0] >= fObj2.values[0] && fObj1.values[1] <= fObj2.values[1];
				case "top":
					return fObj1.values <= fObj2.values;
				case "bottom":
					return fObj1.values <= fObj2.values;
				case "equal":
					return fObj1.values === fObj2.values;
			}
		}
		return false;
	}
};