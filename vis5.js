Promise.all([
    d3.csv("y006 (1).csv"),
    d3.json("geojson.json"),
    d3.json("https://raw.githubusercontent.com/michaeltranxd/UIC-Undergraduate-Research-2019-2020/master/HTML/MyWebsite/topojson/chicago_zipcodes.json")

    // d3.csv("y005.csv")


]).then(function(files){
    y006 = files[0]
    geojson = files[1]
    data = files[2]

  // Width of SVG
width = 380;

// Height of SVG
height = 1000;



// Projection of Chicago
projection = d3.geoMercator()
.scale(width * 90)
.center([-87.6298, 41.8781])
.translate([width / 2, height / 2])

// Get geojson from topojson


// Create color scheme
colorScheme = d3.schemeBlues[8];

colorScheme_false = d3.schemeReds[8];

// Create color scale using the color scheme we created
colorScale_false = d3.scaleThreshold()
.domain([0, 40, 80, 120, 160, 200, 240, 280])
.range(colorScheme_false);

colorScale = d3.scaleThreshold()
.domain([0,1500,3000,4500,6000,7500,9000,10500])
.range(colorScheme);


const svg = d3.select("#map").selectAll("svg").data(['foo']).enter().append("svg")
    .attr("width", 1000)
    .attr("height", 500)
    .attr("class", "topo")

  svg.append("text")
       .attr("transform", "translate(70,320)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")

  //Add the data to the choropleth map
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("class", function(d){return "State"})
    .attr("fill", function(d, i){
      for (let j = 0; j < 556; j++) {
        if(y006[j].key == d.properties.zip){
          //console.log(domain[j][0])
          console.log(parseInt(y006[j]["2020"]) + parseInt(y006[j]["2021"]))
          return colorScale(parseInt(y006[j]["2020"]) + parseInt(y006[j]["2021"]));
        }
      }
  })
    .attr("d", d3.geoPath(projection))
    //.on("mouseover", mouseOver )
    //.on("mouseleave", mouseLeave)
    .on("click", function(d) {
    //   console.log(d.srcElement.__data__.properties.zip)
      update_text(d.srcElement.__data__.properties.zip)     
    })
    .attr("transform","translate(0,-350)");

    function valueP(k) {
        for (let j = 0; j < 556; j++) {
              if(y006[j].key == k){
                return j;
              }
      }
      }


function update_text(data){
        d3.selectAll("#iii")
        .remove()
    a = valueP(data)

  svg.append("text")
          //.attr("transform", "translate(100,380)")
          .attr("id","iii")
          .attr("x",500)
          .attr("y", 8)
          .attr("font-size", "24px")
          .text(function(d){
                //console.log(":" + data.properties.NAME)
                return data;
            })
          .attr("transform","translate(0,30)");

  
          
  
          svg.append("text")
          .attr("id","iii")
        //   .attr("transform", "translate(-80,200)")
          .attr("x",500)
          .attr("y", 55)
          .attr("font-size", "18px")
          .text(function(d){
                //console.log("State:" + data.properties.NAME)
                return "2020: " + y006[a][2020];
            })

            
          
  
          svg.append("text")
          .attr("id","iii")
        //   .attr("transform", "translate(100,380)")
          .attr("x",500)
          .attr("y", 85)
          .attr("font-size", "18px")
          .text(function(d){
                //console.log("State:" + data.properties.NAME)
                return "2021: " + y006[a][2021];
            })

            svg.append("text")
            .attr("id","iii")
            //   .attr("transform", "translate(100,380)")
              .attr("x",500)
              .attr("y", 115)
              .attr("font-size", "18px")
              .text(function(d){
                    //console.log("State:" + data.properties.NAME)
                    return "Total: " + (parseInt(y006[a][2021]) + parseInt(y006[a][2020]));
                })
        //   .attr("transform","translate(0,0)");

      
      }

})