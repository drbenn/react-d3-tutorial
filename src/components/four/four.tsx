import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './four.scss';

export function Four() {
  const lineGraphSvgRef = useRef(null);
  const h = 350;
  const w = 400;

  const monthlySales1 = [
      {"month":10, "sales":20},
      {"month":20, "sales":14},
      {"month":30, "sales":20},
      {"month":40, "sales":21},
      {"month":50, "sales":15},
      {"month":60, "sales":22},
      {"month":70, "sales":9},
      {"month":80, "sales":6},
      {"month":90, "sales":23},
      {"month":100, "sales":7},
  ]

  const monthlySales2 = [
    {"month":10, "sales":100},
    {"month":20, "sales":130},
    {"month":30, "sales":250},
    {"month":40, "sales":300},
    {"month":50, "sales":265},
    {"month":60, "sales":225},
    {"month":70, "sales":180},
    {"month":80, "sales":120},
    {"month":90, "sales":145},
    {"month":100, "sales":130},
]


  useEffect(() => {
    const lineFun = d3.line()
    .x(function(d) { return d.month*3;})
    .y(function(d) { return h-d.sales;}) // "h-"" inverts line to display properly
    .curve(d3.curveLinear);

    const lineGraph = d3.select(lineGraphSvgRef.current);

    lineGraph
      .attr("width", w)
      .attr("height", h)
      .append("path")  // svg line path for chart
        .attr("d", lineFun(monthlySales2))
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("fill", "none")
    
    lineGraph.selectAll("text")
      .data(monthlySales2)
      .enter()
      .append("text")
      .text(function (d) { return d.sales; })
        .attr("x", function(d) {return d.month * 3-25 })
        .attr("y", function(d) {return h - d.sales; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("fill", "#666666")
        .attr("font-weight", function(d,i) {
          if (i === 0 || i== (monthlySales2.length-1)) {return "bold"; }
          else { return "normal"; }
        })
        .attr("text-anchor", "start")
  },[])

  return (
    <>
    <div className='page-title'>Line Graph</div>
    <div className='content-container'>
      <div>
        <svg ref={lineGraphSvgRef}></svg>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p>
    </div>
    </>
  )
}