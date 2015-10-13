
function pickerResize(){
var ratio = 290/25;
var ratio2 = 196/147
var globH = parseInt(d3.select("body").style("height"));
var globW = parseInt(d3.select("body").style("width"));
var percW = 0.2;
var w = globW * percW;
var h= w/ratio

var fontOrig = 12
var increment = w/290;
var newFont = parseInt(fontOrig * increment)

console.log(w, globW)

d3.selectAll("#widgetField").style("width",w).style("height",h).style("font-size", newFont)
d3.selectAll("#widgetCalendar").style("width",w).style("height",h).style("font-size", newFont)
d3.selectAll(".datePicker").style("width",w).style("height",w/ratio2).style("font-size", newFont)
d3.selectAll(".datePickerContainer").style("width",w).style("height",w/ratio2).style("font-size", newFont)

}

