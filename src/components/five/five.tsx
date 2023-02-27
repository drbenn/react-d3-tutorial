import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './five.scss';

export function Five() {
  const scatterChartSvgRef = useRef(null);
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
    const scatterChart = d3.select(scatterChartSvgRef.current);

    scatterChart
      .attr("width", w)
      .attr("height", h)
      .selectAll("circle")
        .data(monthlySales)
        .enter()
        .append("circle")
          .attr("cx", function(d){return d.month*3})
          .attr("cy", function(d){return h-d.sales})
          .attr("r", 5)
          // .attr("fill", "#0000FF")
          .attr("fill", function(d) { return salesKPI(d.sales)})

      scatterChart.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(function (d) { return showMinMax(monthlySales, 'sales', d.sales, 'minmax') })
          .attr("x", function(d) {return d.month * 3-25 })
          .attr("y", function(d) {return h - d.sales; })
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "#666666")
          .attr("text-anchor", "start")
  },[])



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
    <div className='page-title'>Scatter Chart</div>
    <div className='content-container'>
      <div>
        <svg ref={scatterChartSvgRef}></svg>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p>
    </div>
    </>
  )
}