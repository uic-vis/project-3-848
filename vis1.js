Promise.all([
    d3.csv("q1Objects.csv")
]).then(function(files){

    q1Objects = files[0]

margin = ({top: 10, right: 20, bottom: 50, left: 105});

visWidth = 400;

visHeight = 400;

xscale = d3.scaleLinear()
      .domain([0,3])
      .range([0, visWidth])

yscale = d3.scaleLinear()
      .domain([0,60000])
      .range([visHeight, 0])

// Barplot Function

  
    // set up
    const width = 800;
    const height = 800;
    const svg = d3.select('#bar').append('svg')
        .attr('width', visWidth + margin.left + margin.right + 100)
        .attr('height', visHeight + margin.top + margin.bottom + 50);
  
    
    //Axis Labels
    svg.append("text")
         .attr("transform", "translate(210,-25)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "22px")
         .text("Crashes Vs Seasons")
  
    svg.append("text")
         .attr("transform", "translate(230,400)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "17px")
         .text("Seasons")
    
    svg.append("text")
         .attr("transform", "translate(-50,180)")
         // .attr("transform", "rotate(-90)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "17px")
         .text("Crashes")
  
  
    // For X-axis labels
    var xdata = ["Winter", "Spring", "Summer", "Fall"];
    
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
                .ticks(4))
           .append("text")
           .attr("y", height - 250)
           .attr("x", width - 100)
           .attr("text-anchor", "start")
           .attr("stroke", "black")
           // .text("Seasons");
  
  
    // draw bars
    g.selectAll('rect')
      .data(q1Objects)
      .join('rect')
        .attr("class", "bar")
        .attr("x", function(d,i) { return xscale(i); })
        .attr("y", function(d,i) { return yscale(parseInt(q1Objects[i].Crashes)) })
        .attr("width", 35)
        .attr("transform", "translate(0.5,-0.7)")
        .attr("height", function(d,i) { parseInt(q1Objects[i].Crashes);
          return visHeight - yscale(parseInt(q1Objects[i].Crashes)); })
        .style("fill", "LightBlue");
    
    // return svg.node();
  

})

