Promise.all([
    d3.csv("y006.csv")
    // d3.csv("y005.csv")

]).then(function(files){
    y006 = files[0]
    margin1 = ({top: 20, right: 20, bottom: 30, left: 50})
    width1 = 900
    height1 = 550

    x1 = d3.scaleLinear().range([0,width1])

    y1 = d3.scaleLinear().range([height1, 0])


val = function(data, option) {

    console.log(option)
    
  
    var svg = d3.select("#line").append("svg")
      .attr("width", width1 + margin1.left + margin1.right + 100)
      .attr("height", height1 + margin1.top + margin1.bottom + 100)
    .append("g")
      .attr("transform",
            "translate(" + margin1.left + "," + margin1.top + ")")
    
    const allGroup = ["CLEAR", "SNOW", "RAIN"]
   var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);
  const xdata = ["Winter","Spring","Summer","Fall"]
    // Scale the range of the data
    x1.domain([0,3]);
    y1.domain([0, d3.max(data, function(d) {
      console.log(y006[1]["CLEAR"])
        return Math.max(y006[1][option], y006[0][option], y006[2][option], y006[3][option]); })]);
  
    svg.append("text")
         .attr("transform", "translate(160,-44)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "24px")
         .text("Weather Vs Crashes")
  
    svg.append("text")
         .attr("transform", "translate(400,475)")
         .attr("x", 50)
         .attr("y", 50)
         .attr("font-size", "16px")
         .text("Seasons")
  
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
                    return x1(d.Season); })
                    .y(function(d) { 
                      if(option == "CLEAR")
                      return y1(d.CLEAR);
                      if(option == "SNOW")
                        return y1(d.SNOW);
                      if(option == "RAIN")
                        return y1(d.RAIN);
                    }));
  
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x1).tickFormat(function(d){
               return xdata[d];
           })
                .ticks(4))
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

  val(y006,"CLEAR")

  d3.select("#selectButton").on("change", function(d) {
    // recover the option that has been chosen
    d3.select("#line").selectAll("svg")
                      .remove()
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    if(selectedOption == "CLEAR"){
        val(y006,selectedOption)
    }
    else if(selectedOption == "SNOW"){
      val(y006,selectedOption)
    }
    else if(selectedOption == "RAIN"){
      val(y006,selectedOption)
    }
})
  

})