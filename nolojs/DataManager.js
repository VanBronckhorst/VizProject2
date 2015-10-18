// Data Manager script contains the function to extract some statistics from a given dataset

function AtlanticGenerator (dataset) {
  var mainDataset = dataset;
  var atlanticDataset = {"hurricanes" : []};

  for(i = 0; i < mainDataset.hurricanes.length; i++) {
    if(mainDataset.hurricanes[i].ocean == "A") {
      atlanticDataset.hurricanes.push(mainDataset.hurricanes[i]);
    }
  }

  return atlanticDataset;
}

//console.log("Atlantic Dataset: ");
//console.log(AtlanticGenerator(hurricanes));

function PacificGenerator (dataset) {
  var mainDataset = dataset;
  var pacificDataset = {"hurricanes" : []};

  for(i = 0; i < mainDataset.hurricanes.length; i++) {
    if(mainDataset.hurricanes[i].ocean == "P") {
      pacificDataset.hurricanes.push(mainDataset.hurricanes[i]);
    }
  }

  return pacificDataset;
}

function YearStatsGenerator(dataset) {
  var mainDataset = dataset;
  ////console.log(mainDataset);


  //###Generates yearStats Dataset from mainDataset, includes maxWindSpeed and minPressure per Year###
  var yearStats = [];
  var hurrIndex = 0; //remember that variables lives inside the  function
  var hurrCount = 0;
  var changed = false;
  var maxWindSpeed = 0;
  var minPressure = 999999;
  var year;

  //console.log(mainDataset.hurricanes.length);

  while (hurrIndex < mainDataset.hurricanes.length) {
    year = mainDataset.hurricanes[hurrIndex].points[0].date.substring(0, 4);

    hurrCount++;
    for(pointIndex = 0; pointIndex < mainDataset.hurricanes[hurrIndex].points.length; pointIndex++) {
      //magari controllare che pressione prima di iffare
      if(mainDataset.hurricanes[hurrIndex].points[pointIndex].maxSpeed > maxWindSpeed) {
        maxWindSpeed = mainDataset.hurricanes[hurrIndex].points[pointIndex].maxSpeed;
      }
      if(mainDataset.hurricanes[hurrIndex].points[pointIndex].pressure < minPressure) {
        ////console.log('in in year:' + year);
        minPressure = mainDataset.hurricanes[hurrIndex].points[pointIndex].pressure;
      }
    }

    hurrIndex++;
    if(hurrIndex < mainDataset.hurricanes.length) {
      ////console.log(year);
      ////console.log(mainDataset.hurricanes[hurrIndex].points[0].date.substring(0, 4));
      if(year != mainDataset.hurricanes[hurrIndex].points[0].date.substring(0, 4)) {
        changed = true;
      }
    }

    if(changed || (hurrIndex >= mainDataset.hurricanes.length)) {
      if(minPressure != 999999) {
        json = '{' +'"YEAR" : "' + mainDataset.hurricanes[hurrIndex-1].points[0].date.substring(0, 4) + '",'
        + '"MAX_WIND_SPEED" : "' + maxWindSpeed + '",' + '"MIN_PRESSURE" : "' + minPressure + '",'
        + '"NUMBER_OF_HURRICANES" : "' + hurrCount + '"}';
      } else {
        json = '{' +'"YEAR" : "' + mainDataset.hurricanes[hurrIndex-1].points[0].date.substring(0, 4) + '",'
        + '"MAX_WIND_SPEED" : "' + maxWindSpeed + '",' + '"MIN_PRESSURE" : "NA",'
        + '"NUMBER_OF_HURRICANES" : "' + hurrCount + '"}';
      }
      ////console.log(json);
      yearStats.push(JSON.parse(json));
      hurrCount = 0;
      changed = false;
      maxWindSpeed = 0;
      minPressure = 999999;
    }

  }

  ////console.log(yearStats);
  //####################################################

  //##Generates maxWindSpeed over Years Dataset##
  return yearStats;
}

function MonthStatsGenerator(dataset) {
 /* var mainDataset = dataset
  ////console.log(mainDataset);

  //###Generates yearStats Dataset from mainDataset, includes maxWindSpeed and minPressure per Year###
  var yearStats = [];
  var hurrIndex = 0; //remember that variables lives inside the  function
  var hurrCount = 0;
  var changed = false;
  var maxWindSpeed = 0;
  var minPressure = 999999;
  var year;

  //console.log(mainDataset.hurricanes.length);

  while (hurrIndex < mainDataset.hurricanes.length) {
    year = mainDataset.hurricanes[hurrIndex].points[0].date.substring(0, 4);

    hurrCount++;
    for(pointIndex = 0; pointIndex < mainDataset.hurricanes[hurrIndex].points.length; pointIndex++) {
      //magari controllare che pressione prima di iffare
      if(mainDataset.hurricanes[hurrIndex].points[pointIndex].maxSpeed > maxWindSpeed) {
        maxWindSpeed = mainDataset.hurricanes[hurrIndex].points[pointIndex].maxSpeed;
      }
      if(mainDataset.hurricanes[hurrIndex].points[pointIndex].pressure < minPressure) {
        ////console.log('in in year:' + year);
        minPressure = mainDataset.hurricanes[hurrIndex].points[pointIndex].pressure;
      }
    }

    hurrIndex++;
    if(hurrIndex < mainDataset.hurricanes.length) {
      ////console.log(year);
      ////console.log(mainDataset.hurricanes[hurrIndex].points[0].date.substring(0, 4));
      if(year != mainDataset.hurricanes[hurrIndex].points[0].date.substring(0, 4)) {
        changed = true;
      }
    }

    if(changed || (hurrIndex >= mainDataset.hurricanes.length)) {
      if(minPressure != 999999) {
        json = '{' +'"YEAR" : "' + mainDataset.hurricanes[hurrIndex-1].points[0].date.substring(0, 4) + '",'
        + '"MAX_WIND_SPEED" : "' + maxWindSpeed + '",' + '"MIN_PRESSURE" : "' + minPressure + '",'
        + '"NUMBER_OF_HURRICANES" : "' + hurrCount + '"}';
      } else {
        json = '{' +'"YEAR" : "' + mainDataset.hurricanes[hurrIndex-1].points[0].date.substring(0, 4) + '",'
        + '"MAX_WIND_SPEED" : "' + maxWindSpeed + '",' + '"MIN_PRESSURE" : "NA",'
        + '"NUMBER_OF_HURRICANES" : "' + hurrCount + '"}';
      }
      ////console.log(json);
      yearStats.push(JSON.parse(json));
      hurrCount = 0;
      changed = false;
      maxWindSpeed = 0;
      minPressure = 999999;
    }

  }

  //console.log(yearStats);
  //####################################################

  //##Generates maxWindSpeed over Years Dataset##
  return yearStats;
  */
}
