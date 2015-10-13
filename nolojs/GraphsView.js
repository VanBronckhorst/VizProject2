var DEBUG = true;

function log(something){
  if(DEBUG){
    console.log(something);
  }
}



//TILES CREATION
var GraphsView = function () {
  'use-strict';
  console.log('iinnnn');

  this.graphsBoxWidth = 800;
  this.graphsBoxHeight = 600;

  this.panelWidth = 800;
  this.panelHeight = 600;

  var graphsViewLayout = this;

  this.lists = []; //has all the list displayed: the name of the hurricanes, the speeds

  //data initially is empty
  this.data = [];

  //GRAB THE MAP
  this.map = d3.select('#map');

  this.graphsViewDiv = this.map.append('div')
  .attr('id','graphsView');

  //code to close and open the panel
  var toggle = [true, true, true];

  function resizeFilterView(panelId) {
    //console.log('inthefunction');
    //var widthVal = (toggle[panelId])? 0 : 25;
    var widthVal = (toggle[panelId])? (2 + panelId) : 50;
    //var heightVal = (toggle[panelId])? 100 : 100;
  $('.panel.' + panelId).animate({'width' : widthVal+'%'/*, 'height': heightVal+'%'*/}, {
      //duration:750,
      complete: function() {
        toggle[panelId] = !toggle[panelId];
      }
    });
}

var allDiv = this.graphsViewDiv
.append("div")
.attr('class', 'panel ' + 0)
.style('background-color', 'red')
.on('click', function () {
  resizeFilterView(0);
});

/*var allSVG = allDiv.append('svg')
.style('width','100%')
.style('height', '100%')
.attr("viewBox", "0 0 "+ this.panelWidth + " " + this.panelHeight); // VIEWBOX of the Panels*/

var atlanticHurricanes = AtlanticGenerator(hurricanes);
var pacificHurricanes = PacificGenerator(hurricanes);

var allPYCdiv = allDiv.append('div').style('width', '100%').style('height', '33.333%');
var allMWCdiv = allDiv.append('div').style('width', '100%').style('height', '33.333%');
var allMPCdiv = allDiv.append('div').style('width', '100%').style('height', '33.333%');

HurrPerYearChart(YearStatsGenerator(atlanticHurricanes), allPYCdiv, 1, false);
MaxWindChart(YearStatsGenerator(atlanticHurricanes), allMWCdiv, 2, false);
MinPressureChart(YearStatsGenerator(atlanticHurricanes), allMPCdiv, 3, false);

  // POI APPENDERE AGLI SVG I VARI GRAFICI,
  // O SCEGLIERE SE APPENDERLI DIRETTAMENTE AL DIV

  var visDiv = this.graphsViewDiv
  .append("div")
  .attr('class', 'panel ' + 1)
  .style('background-color', 'white')
  .on('click', function () {
    resizeFilterView(1);
  });

  /*var visSVG = visDiv.append('svg')
  .style('width','100%')
  .style('height', '100%')
  .attr("viewBox", "0 0 "+ this.panelWidth + " " + this.panelHeight); // VIEWBOX of the Panels*/

  var visPYCdiv = visDiv.append('div').style('width', '100%').style('height', '33.333%');
  var visMWCdiv = visDiv.append('div').style('width', '100%').style('height', '33.333%');
  var visMPCdiv = visDiv.append('div').style('width', '100%').style('height', '33.333%');

HurrPerYearChart(YearStatsGenerator(atlanticHurricanes), visPYCdiv, 1, false);
MaxWindChart(YearStatsGenerator(atlanticHurricanes), visMWCdiv, 2, false);
MinPressureChart(YearStatsGenerator(atlanticHurricanes), visMPCdiv, 3, false);

  var selDiv = this.graphsViewDiv
  .append("div")
  .attr('class', 'panel ' + 2)
  .style('background-color', 'green')
  .on('click', function () {
    resizeFilterView(2);
  });

  /*var selSVG = selDiv.append('svg')
  .style('width','100%')
  .style('height', '100%')
  .attr("viewBox", "0 0 "+ this.panelWidth + " " + this.panelHeight); // VIEWBOX of the Panels*/

  var selPYCdiv = selDiv.append('div').style('width', '100%').style('height', '33.333%');
  var selMWCdiv = selDiv.append('div').style('width', '100%').style('height', '33.333%');
  var selMPCdiv = selDiv.append('div').style('width', '100%').style('height', '33.333%');

HurrPerYearChart(YearStatsGenerator(pacificHurricanes), selPYCdiv, 1, false);
MaxWindChart(YearStatsGenerator(pacificHurricanes), selMWCdiv, 2, false);
MinPressureChart(YearStatsGenerator(pacificHurricanes), selMPCdiv, 3, false);

/*
//create svg for filterView
var svg = this.graphsViewDiv
.append("svg")
.attr("viewBox", "0 0 "+ this.graphsBoxWidth + " " + this.graphsBoxHeight) //VIEWBOX OF THE GRAPHSVIEW
.style('width','100%')
.style('height', '100%');


//add title text
this.g = svg.append('g');

this.g.append('text')
.attr('class','title-controls')
.text('CONTROLS')
.attr('y', '0')
.attr('x', '250');
*/

/*
//add container svg for lists
this.svgList = this.g.append('svg')
.attr('id', 'svg-list')
.append('g');

this.svgList
.append('rect')
.attr('id', 'rect-list')
.attr('y', '10')
.attr('x', '10');

var listCreator = new ListCreator();

this.list = listCreator.createList(this.svgList,'NAME');
this.listSpeed = listCreator.createList(this.svgList,'N');

this.lists.push({'list':this.list, 'attribute' : 'name'},{'list':this.listSpeed,'attribute':'n'});


  //add button arrow up
  this.svgList
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'FontAwesome')
  .attr('font-size', 20)
  .attr('pointer-events','all' )
  .attr('x', 770 )
  .attr('y', 40)
  .on('click',function(){slideList('up');})
  .text(function(d) { return '\uf139'; });

  //add button arrow down
  this.svgList
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'FontAwesome')
  .attr('font-size', 20)
  .attr('pointer-events','all' )
  .attr('x', 770 )
  .attr('y', 400)
  .on('click',function(){slideList('down');} )
  .text(function(d) { return '\uf13a'; });


  //function to make the hurricane list slide up or down
  function slideList(direction){ //direction is up or down

    //if the user ask to slide down when there are no more hurricane
    //or to slide up when the list is at the beginning
    //return
    if(direction === 'down' && filterViewLayout.lastWordIndex == filterViewLayout.data.length - filterViewLayout.wordBatchSize ||
      direction === 'up' && filterViewLayout.lastWordIndex == 0){
      return;
  }


    //update the lastWord Index accordingly to the direction
    filterViewLayout.lastWordIndex = (direction === 'down') ?
    d3.min([filterViewLayout.data.length - filterViewLayout.wordBatchSize ,filterViewLayout.lastWordIndex + filterViewLayout.wordBatchSize])
    :d3.max([0,filterViewLayout.lastWordIndex - filterViewLayout.wordBatchSize]);

    //calculate the upperIndex for slice
    // the upper is either the max length of data or the last index plust the batch size
    var upperIndexSlice = d3.min([filterViewLayout.data.length,filterViewLayout.lastWordIndex + filterViewLayout.wordBatchSize]);

    filterViewLayout.lists.forEach(function(d){updateValuesOf(d);})

    function updateValuesOf(list){
      var attribute = list['attribute'];
      list = list['list'];

    //bind new data
    list = list
    .data(filterViewLayout.data.slice(filterViewLayout.lastWordIndex,upperIndexSlice));

    //and remove old elements if any
    list
    .exit()
    .remove();

    //move all elements down or up
    list
    .attr('y', function(d,i){
      return (direction === 'down') ?
      filterViewLayout.viewBoxHeight*0.7 :
      filterViewLayout.viewBoxHeight*0.1;
    });

      // move all the elements to their position
      list
      .transition()
      .attr('y', function(d,i){
        return yValue(i) ;
      })
      .text(function(d,i){
        return d[attribute];
      })
      .attr('color','black')
      .attr('font-size',20 );
    }

}
*/
    //function to update list when model is updated
    this.update = function(data){
      //change data
      this.data = data;
      /* updateSingleList(filterViewLayout.lists[0]);

      updateSingleList(filterViewLayout.lists[1]);

      function updateSingleList(list){
        var attribute = list['attribute'];
        list = list['list'];

        list = list
        .data(filterViewLayout.data.slice(0,this.wordBatchSize));

        //update
        list
        .text(function(d,i){
          return d[attribute];
        })
        .attr('y', function(d,i){
          return yValue(i);
        });
}*/
};

  //**UTILITY**//

  //the function return the y value of the text accordingly to its index
  function yValue(index){
    return index * 100 + 130;
  }

};


//GraphsView.prototype.modelUpdated = function(data){
//  this.update(data);
//}


//f = new GraphsView();
GraphsView();

//umbertoData = hurricanes["hurricanes"].slice(1000,1020);
//f.modelUpdated(umbertoData);
//f.modelUpdated(['primo','secondo','terzo','quarto','quinto',"sestads",'ancora','dipiue','ancoramiatuo','ultimo!!!']);





