var UtilityView = {
	variable : 'maxSpeed', //default 

	descending: function(a,b){		
		if(a[UtilityView.variable]< b[UtilityView.variable])
			return 1;
		if (a[UtilityView.variable] > b[UtilityView.variable])
			return -1;
		return 0;
	},

	ascending: function(a,b){		
		if(a[UtilityView.variable]< b[UtilityView.variable])
			return -1;
		if (a[UtilityView.variable] > b[UtilityView.variable])
			return 1;
		return 0;
	},
}