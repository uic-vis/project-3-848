Promise.all([
    d3.csv("q1Objects1.csv"),
    d3.csv("y35.csv")
    // d3.csv("y005.csv")

]).then(function(files){

    q1Objects1 = files[0]
    y35 = files[1]

    margin = ({top: 10, right: 20, bottom: 50, left: 105});

    visWidth = 900;

    visHeight = 400;

    xscale = d3.scaleLinear()
      .domain([0,12])
      .range([0, visWidth])

      yscale = d3.scaleLinear()
      .domain([0,25000])
      .range([visHeight, 0])
      const width = 1000;
      const height = 800;
  
  const svg = d3.select('#map1').append('svg')
      .attr('width', visWidth + margin.left + margin.right + 100)
      .attr('height', visHeight + margin.top + margin.bottom + 100);

  
  //Axis Labels
  svg.append("text")
       .attr("transform", "translate(210,-25)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "22px")
       .text("Crashes Vs Months")

  svg.append("text")
       .attr("transform", "translate(230,400)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "17px")
       .text("Months")
  
  svg.append("text")
       .attr("transform", "translate(-50,180)")
       // .attr("transform", "rotate(-90)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "17px")
       .text("Crashes")


  // For X-axis labels
  var xdata = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // axes
  
    g.append("g")
         .call(d3.axisLeft(yscale).tickFormat(function(d){
             return d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-11.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "brown")
         // .text("Crashes");

    g.append("g")
         .attr("transform", "translate(12," + visHeight + ")")
         .call(d3.axisBottom(xscale).tickFormat(function(d){
             return xdata[d];
         })
              .ticks(12))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "start")
         .attr("stroke", "black")
         // .text("Seasons");


  // draw bars
  g.selectAll('rect')
    .data(q1Objects1)
    .join('rect')
      .attr("class", "bar")
      .attr("x", function(d,i) { return xscale(i); })
      .attr("y", function(d,i) { return yscale(parseInt(q1Objects1[i].Crashes)) })
      .attr("width", 35)
      .on("click", function(d) {
        console.log(d.target.__data__.Months)
        update_line(y35,d.target.__data__.Months)
      })
      .attr("transform", "translate(0.5,-0.7)")
      .attr("height", function(d,i) { parseInt(q1Objects1[i].Crashes);
        return visHeight - yscale(parseInt(q1Objects1[i].Crashes)); })
      .style("fill", "LightBlue");

      margin1 = ({top: 20, right: 20, bottom: 30, left: 50})

      width1 = 1000

      height1 = 500

      x1 = d3.scaleLinear().range([0,width1])

      y1 = d3.scaleLinear().range([height1, 0])


update_line = function(data,k) {

    console.log(data,k)
  
     d3.select("#line").select('svg')
              .remove()
  
    var svg = d3.select("#line").append("svg")
      .attr("width", width1 + margin1.left + margin1.right + 100)
      .attr("height", height1 + margin1.top + margin1.bottom + 100)
    .append("g")
      .attr("transform",
            "translate(" + margin1.left + "," + margin1.top + ")")
    
    const allGroup = ["1", "2", "3","4","5","6","7","8","9","10","11","12"]
   var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);
  const xdata = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    // Scale the range of the data
    x1.domain([0,23]);
    // y1.domain([0, d3.max(data, function(d) {
    //   // console.log(y006[1]["CLEAR"])
       //  return Math.max(y35[k][1], y006[0][option], y006[2][option], y006[3][option]); })]);
    y1.domain([0, 1500])
  
    svg.append("text")
         .attr("transform", "translate(160,-44)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "24px")
         .text("Crashes Vs Hour")
  
    svg.append("text")
         .attr("transform", "translate(400,475)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "16px")
         .text("Hour")
  
    svg.append("text")
         .attr("transform", "translate(-100,-55)")
        //.attr("transform", "rotate(-90)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "16px")
         .text("Crashes")
    
    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("stroke-width", 4)
        .style("fill", "none")
        .attr("d", d3.line()
                    .x(function(d) { 
                    return x1(d.Hour); })
                    .y(function(d) { 
                      console.log(y1(d["1"]))
                      return y1(d[k]);
                    }));
  
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x1).tickFormat(function(d){
               return xdata[d];
           })
                .ticks(24))
        .call(g => g.selectAll('.tick line')
          .clone()
            .attr('stroke', '#d3d3d3')
            .attr('y1', - height1)
            .attr('y2', 0));
  
    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y1))
        .call(g => g.selectAll('.tick line')
          .clone()
            .attr('stroke', '#d3d3d3')
            .attr('x1', 0)
            .attr('x2', width1));
    
    // d3.select("#selectButton").on("change", function(d) {
    //       // recover the option that has been chosen
    //       var selectedOption = d3.select(this).property("value")
    //       // run the updateChart function with this selected option
    //       update(selectedOption)
    //   })
  
  
  }
  
  
})