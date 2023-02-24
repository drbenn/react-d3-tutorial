import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './three.scss';

export function Three() {
  const barGraphSvgRef = useRef(null);
  const w = 300;
  const h = 100;
  const padding = 2;
  const dataset = [5, 10, 14, 20, 25, 11, 25, 22, 18, 7];

  useEffect(() => {
    const barGraph = d3.select(barGraphSvgRef.current);

    barGraph
      .attr("width", w)
      .attr("height", h)
      .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
          .attr("x", function(d, i) {
            return (i * (w / dataset.length));
          })
          .attr("y", function(d) { return h - ( d * 2.5 )}) // adjusts orientation of bars to accomodate height multiplier of 2.5
          .attr("width", (w / dataset.length - padding))
          .attr("height", function(d) { 
            return (d * 2.5) // height multiplier of 2.5
          })
          // .attr("fill", function(d) {
          //   return "rgb(0, " + (d*10) + ", 0)";
          // })
          .attr("fill", function(d) { 
            return colorPicker(d);
          })
      // .selectAll("text")
      //   .data(dataset)
      //   .enter()
      //   .append("text")
      //   .text(function (d) { return d; })
      //     .attr("text-anchor", "middle")
      //     .attr("x", function(d, i) {return i * (w /dataset.length)})
      //     .attr("y", function(d) {return h - (d*2.5)})

      barGraph.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) { return d; })
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {return i * (w /dataset.length) + (w / dataset.length - padding ) / 2; })
          .attr("y", function(d) {return h - (d * 2.5) + 10 })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10")
          .attr("fill", "#ffffff")
          .attr("font-weight", "600")

  },[])


  function colorPicker(v) {
    if ( v <= 20 ) { return "#666666";}
    else if ( v > 20 ) { return "#FF0033";}
  }



  return (
    <>
    <div className='page-title'>Bar Graph Demo</div>
    <div className='content-container'>
      <div>
        <svg ref={barGraphSvgRef}></svg>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p>
    </div>
    </>
  
  )
}