Promise.all([
    d3.csv("Crashes (4).csv"),
    d3.csv("y22.csv")
    // d3.csv("y005.csv")

]).then(function(files){
    data = files[0]
    y22 = files[1]

    y4 = d3.rollup(data, v => v.length, d => d.CRASH_SEASON, d => d.LIGHTING_CONDITION, d => d.CRASH_YEAR)

    y23 = Array.from(y4)

    y005 = Array.from(y23, ([Season, Value]) => ({
        Season: Season,
        ...Object.fromEntries(Value) // maps each of cities.keys() to each of cities.values()
      }));

    margin = ({top: 10, right: 20, bottom: 50, left: 105});
    visWidth = 480;
    visHeight = 500;

var subgroups = ["DARKNESS","DARKNESS, LIGHTED ROAD","UNKNOWN","DUSK","DAWN","DAYLIGHT"];

var groups = ["0","1","2","3"];
    //X-axis
x = d3.scaleBand()
.domain(groups)
.range([0, visWidth])
.padding([0.2])

//Y-axis
y = d3.scaleLinear()
    .domain([0, 55686])
    .range([ visHeight, 0 ]);

    //Color Scale
color = d3.scaleOrdinal()
.domain(subgroups)
.range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462"])



// Helper function used to retrive the keys
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] == value);
  }

  const svg = d3.select('#map1').append('svg')
  .attr('width', visWidth + margin.left + margin.right + 1300)
  .attr('height', visHeight + margin.top + margin.bottom + 70);

const xdata = ["Winter", "Spring", "Summer", "Fall"];

//axis labels
// svg.append("text")
//    .attr("transform", "translate(210,-25)")
//    .attr("x", 50)
//    .attr("y", 50)
//    .attr("font-size", "18px")
//    .text("Crashes Vs Lighting Conditions Vs Seasons")

svg.append("text")
   .attr("transform", "translate(270,500)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "17px")
   .text("Seasons")

svg.append("text")
   .attr("transform", "translate(-50,155)")
   // .attr("translate", "rotate(-90)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "17px")
   .text("Crashes")

//    svg.append("text")
//    .attr("transform", "translate(270,500)")
//    .attr("x", 700)
//    .attr("y", -480)
//    .attr("font-size", "28px")
//    .attr("font-weight","bold")
//    .text("Inference")

//Legend

svg.append("circle").attr("cx",600).attr("cy",50).attr("r", 6).style("fill", "#8dd3c7")
svg.append("circle").attr("cx",600).attr("cy",80).attr("r", 6).style("fill", "#ffffb3")
svg.append("circle").attr("cx",600).attr("cy",110).attr("r", 6).style("fill", "#bebada")
svg.append("circle").attr("cx",600).attr("cy",140).attr("r", 6).style("fill", "#fb8072")
svg.append("circle").attr("cx",600).attr("cy",170).attr("r", 6).style("fill", "#80b1d3")
svg.append("circle").attr("cx",600).attr("cy",200).attr("r", 6).style("fill", "#fdb462")
svg.append("text").attr("x", 620).attr("y", 50).text("DARKNESS").style("font-size", "11px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 620).attr("y", 80).text("DARKNESS, LIGHTED ROAD").style("font-size", "11px")
.attr("alignment-baseline","middle")
svg.append("text").attr("x", 620).attr("y", 110).text("UNKNOWN").style("font-size", "11px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 620).attr("y", 140).text("DUSK").style("font-size", "11px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 620).attr("y", 170).text("DAWN").style("font-size", "11px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 620).attr("y", 200).text("DAYLIGHT").style("font-size", "11px").attr("alignment-baseline","middle")

//Svg
const g = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// axes

g.append("g")
     .call(d3.axisLeft(y).tickFormat(function(d){
         return d;
     })
     .ticks(10))
     .append("text")

g.append("g")
     .attr("transform", "translate(12," + visHeight + ")")
     .call(d3.axisBottom(x).tickFormat(function(d){
         return xdata[d];
     })
          .ticks(4))
     .append("text")
     




//stack the data? --> stack per subgroup
const stackedData = d3.stack()
.keys(subgroups)
(y22)
// console.log(stackedData)

// Show the bars
g.append("g")
.selectAll("g")
// Enter in the stack data = loop key per key = group per group
.data(stackedData)
.enter().append("g")
  .attr("fill", function(d) {
    // console.log(d.key)
    return color(d.key); })
  .selectAll("rect")
  // enter a second time = loop subgroup per subgroup to add all rectangles
  .data(function(d) { 
    return d; })
  .enter().append("rect")
    .attr("x", function(d) { 
      // console.log(d.data.Season)
      return x((d.data.Season)); })
    .attr("y", function(d) { console.log(y(d[1]))
                            console.log(d)
      return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    .attr("width",40)
    .on("click", function(d) {
    var diff =  d.target.__data__[1] - d.target.__data__[0]
    var k = getKeyByValue(d.target.__data__.data,diff)
    console.log(k)
    update_pie(d.target.__data__.data, k)
  })
    .attr("transform", "translate(38,0.2)")

    function update_pie(data, k){
        //Pie chart function
        
        var season = data.Season
        var dt = String(k)
        console.log(dt)
        console.log(season)
        const ss = ["WINTER", "SPRING", "SUMMER", "FALL"]
        var b = 3
        var a = "DARKNESS"
        console.log(y005[season])
        
        if (season == 0){
          b = 0
        }
        if (season == 1){
          b = 1
        }
        if (season == 2){
          b = 2
        }
      
        if(dt == "DARKNESS, LIGHTED ROAD"){
          a = "DARKNESS, LIGHTED ROAD"
        }
        if(dt == "DAWN"){
          a = "DAWN"
        }
        if(dt == "DAYLIGHT"){
          a = "DAYLIGHT"
        }
        if(dt == "DUSK"){
          a = "DUSK"
        }
        if(dt == "UNKNOWN"){
          a = "UNKNOWN"
        }
      
        const width = 700,
          height = 450,
          margin = 40;
      
      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      const radius = Math.min(width, height) / 2 - margin;
      
      
      
      // append the svg object to the div called 'pie'
        d3.select("#pie").select('svg')
                  .remove()
        
      const svg = d3.select("#pie")
        .append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", `translate(${width/2}, ${height/2})`);
      
        svg.append("text")
             .attr("transform", "translate(-90,-230)")
             .attr("x", 0)
             .attr("y", 20)
             .attr("font-size", "18px")
             .text(ss[season] + " AND " + dt)
      
      // set the color scale
      const color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6"])
      
      // Compute the position of each group on the pie:
      const pie = d3.pie()
        .value(function(d,i) {
          //console.log()
          if(i == 0){
            return d[1]['2020'];
          }
          else{
            return d[1]['2021'];
          }
          })
      const data_ready = pie(Object.entries( Array.from(y005[b][a], ([key, value]) => {
        return {[key]: value};
      })))
      
        var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        
      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
          .attr('d', arcGenerator)
          .attr('fill', function(d,i){ if(i == 0){
            return "#a6cee3";
          }
          else{
            return "#b2df8a";
          } })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)
      
        svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d,i){ 
          // console.log(d.data[1][2020])
          if(i == 0){
            var a = "2020: " + d.data[1][2020]
            return a;
          }
          else{
            var a = "2021: " + d.data[1][2021]
            return a;
          }
          //return "grp " + d.data.key
        })
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)
      }

})