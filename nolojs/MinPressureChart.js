//console.log('inTheScript');
//console.log(hurricanes);

function MinPressureChart(dataset, container, columnId, percOn) {
  //console.log('inTheFunction');

  var chartContainer = container;
  var hurrData = dataset;

  var percentageOn = percOn;

  // Dataset changed by granularity
  var newDataset = [];

  /*
  // Computes the total population
  var totalPopulation = 0;
  for (var i = 0; i < hurrData.length; i++) {
    totalPopulation = totalPopulation + parseInt(stateData[i].POPEST2014);
  }
  //console.log(totalPopulation);*/

  // Define ViewBox dimensions
  var viewBoxWidth = 800;
  var viewBoxHeight = 500;
  var viewBoxMargin = 50;



  // Define scales
  var xScale = d3.scale.ordinal()
  .domain(d3.range(
          d3.min(hurrData , function (d, i) {
            return parseInt(d.YEAR);
          }),
          d3.max(hurrData , function (d, i) {
            return parseInt(d.YEAR);
          })+1))
  .rangeRoundBands([viewBoxMargin, viewBoxWidth - viewBoxMargin], 0.1);

  /*var xAxisScale = d3.scale.ordinal()
  .domain(d3.range(hurrData.length))
  .rangeRoundBands([viewBoxMargin, viewBoxWidth - viewBoxMargin], 0.2);*/

  var yScale = d3.scale.linear().domain([d3.min(hurrData , function (d, i) {
    if(d.MIN_PRESSURE != 'NA') {
      return parseInt(d.MIN_PRESSURE);
    } else {
      return 999999; //PROVARE ANCHE A RITORNARE -1
    }
  }),
  d3.max(hurrData , function (d, i) {
    if(d.MIN_PRESSURE != 'NA') {
      return parseInt(d.MIN_PRESSURE);
    } else {
      return 0; //PROVARE ANCHE A RITORNARE -1
    }
  })])
  .range([viewBoxMargin, viewBoxHeight - viewBoxMargin]);

  // Need a different one cause it is inverted
  var yAxisScale = d3.scale.linear().domain([d3.min(hurrData , function (d, i) {
    if(d.MIN_PRESSURE != 'NA') {
      return parseInt(d.MIN_PRESSURE);
    } else {
      return 999999; //PROVARE ANCHE A RITORNARE -1
    }
  }), d3.max(hurrData , function (d, i) {
    if(d.MIN_PRESSURE != 'NA') {
      return parseInt(d.MIN_PRESSURE);
    } else {
      return 0; //PROVARE ANCHE A RITORNARE -1
    }
  })])
  .range([viewBoxHeight - viewBoxMargin, viewBoxMargin]);

  // Define Axes
  var xAxis = d3.svg.axis()
  .scale(xScale);

  // Formatter for the y axis
  formatter = d3.format(".2%");
  formatterAbs =d3.format(".");

  var yAxis = d3.svg.axis()
  .scale(yAxisScale)
  .orient("left")
  .ticks(10);

  if(percentageOn) {
    yAxis.tickFormat(formatter);
  } else {
    yAxis.tickFormat(formatterAbs);
  }

  // Create SVG element
  var svg = container
  .append('svg')
  .attr('class', 'svg barchart' + columnId)
  .style('width', '100%')
  .style('height', '100%')
  .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  //.attr('preserveAspectRatio', 'xMinYMin meet');

   // Setting the line layout function to extract coordinates data from dataset
   var line = d3.svg.line()
   .x(function(d){return xScale(d.YEAR);})
   .y(function(d){
    if(d.MIN_PRESSURE != 'NA') {
      return viewBoxHeight - yScale(parseInt(d.MIN_PRESSURE));
    } else {
      return viewBoxHeight - yScale(900); //PROVARE ANCHE A RITORNARE -1
    }
  });

  // Creating path lines
  svg.append("path")
  .attr("d", line(hurrData))
  .attr("class", "min_pressure");

  // Create Circles
  svg.selectAll('circle')
  .data(hurrData)
  .enter()
  .append('circle')
  .attr('class', 'min_pressure')
  .attr('cx', function (d, i) {
    //console.log('inthecircles');
    return xScale(d.YEAR);
  })
  .attr('cy', function (d, i) {
    if(percentageOn) {
      //return viewBoxHeight - yScale(parseInt(d.POPEST2014)/totalPopulation);
    } else {
      if(d.MIN_PRESSURE != 'NA') {
        return viewBoxHeight - yScale(parseInt(d.MIN_PRESSURE));
      } else {
        return viewBoxHeight - yScale(900);//PROVARE ANCHE A RITORNARE -1
      }
    }
  })
  .attr('r', 2)
  .style('fill', function (d, i) {
    if(d.MIN_PRESSURE != 'NA') {
      //return 'MediumSeaGreen';
    } else {
      //console.log('inthecolor');
      return 'Black';
    }
  });

  /*
  // Create bars
  svg.selectAll('rect')
  .data(hurrData)
  .enter().append('rect')
  .attr('x', function (d, i) {
    ////console.log(i);
    return xScale(d.YEAR);
  })
  .attr('y', function (d, i) {
    ////console.log(d.POPEST2010_CIV);
    if(percentageOn) {
      //return viewBoxHeight - yScale(parseInt(d.POPEST2014)/totalPopulation);
    } else {
      return viewBoxHeight - yScale(parseInt(d.MIN_PRESSURE));
    }
  })
  .attr('width', xScale.rangeBand())
  .attr('height', function (d, i) {
   if(percentageOn) {
     //return yScale(parseInt(d.POPEST2014)/totalPopulation) - viewBoxMargin;
   } else {
    return yScale(parseInt(d.MIN_PRESSURE)) - viewBoxMargin;
  }
})
  //.attr("fill", function(d, i) {return "rgba(" + 0 + "," + (255 - i*2) + "," + (255 - i*2) + "," + 0.7 + ")"; })
  .attr('fill', 'rgb(166,206,227)')
  .attr('stroke', 'black')
  .attr('stroke-width', 1); //then scales with granularity (i*granularity)
  */

  //Create X axis
  var myXAxis = svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (viewBoxHeight - viewBoxMargin) + ")")
  .call(xAxis);

  /*this.myXAxis = this.svg.append("g").attr('class',"x axis" ).call(this.xAxis)
  .attr('shape-rendering', 'geometricPrecision')
  .attr('font-size', this.viewBoxHeight/10)
  .attr("transform", "translate(0,"+this.viewBoxHeight+")");*/

  //Create Y axis
  svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + viewBoxMargin + ",0)")
  .call(yAxis);

  // Hide some ticks
  var xTicksText =  svg.select('.x.axis')
  .selectAll('.tick text');

  xTicksText.style('opacity', function (d, i) {
    if(i%11!==0 && i!=163) {
      return 0;
    } else {
      return 1;
    }
  });

}
