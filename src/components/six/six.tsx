import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './six.scss';

export function Six() {
  const lineGraphSvgRef = useRef(null);
  const h = 350;
  const w = 400;


  const monthlySales = [
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



    const lineGraph = d3.select(lineGraphSvgRef.current);

    lineGraph
    .attr("width", w)
    .attr("height", h)
    .append("path")  // svg line path for chart
      .attr("d", buildLine(monthlySales))
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .attr("fill", "none")
  
  lineGraph.selectAll("text")
    .data(monthlySales)
    .enter()
    .append("text")
    .text(function (d) { return d.sales; })
      .attr("x", function(d) {return d.month * 3-25 })
      .attr("y", function(d) {return h - d.sales; })
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("fill", "#666666")
      .attr("font-weight", function(d,i) {
        if (i === 0 || i== (monthlySales.length-1)) {return "bold"; }
        else { return "normal"; }
      })
      .attr("text-anchor", "start")
  },[])


  function buildLine(ds:any) {
    const xScale = 
      d3.scaleLinear()
        .domain([
          Number(d3.min(ds.monthlySales, function(d: any) {return d.month; })),
          Number(d3.max(ds.monthlySales, function(d: any) {return d.month; }))
        ])
        // .range(0,w)
        // .domain([130,350])
        .range([0, w])
  
    const yScale = 
      d3.scaleLinear()
        .domain([
          0,
          Number(d3.min(ds.monthlySales, function(d: any) {return d.sales; })),
          ])
        .range([h, 0])

    const lineFun = d3.line()
      .x(function(d) { return xScale(d.month);})
      .y(function(d) { return yScale(d.sales);}) 
      .curve(d3.curveLinear);


  }

  // KPI(Key Performance Indicator) color
  function salesKPI(d) {
    if (d>=250) {return "#33CC66"; }
    else if (d<250) {return "#666666"; }
  }

  // display text label of min/max values only
  function showMinMax(ds, col, val, type) {
    const max = d3.max(ds, function(d) {return d[col]; })
    const min = d3.min(ds, function(d) {return d[col]; })

    if (type=='minmax' && ( val == max || val == min)) {
      return val;
    } else {
      if (type == 'all') {
        return val;
      }
    }
  }

  return (
    <>
    <div className='page-title'>Line w/Scale</div>
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