import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './two.scss';

export function Two() {
  const barGraphRef = useRef(null);
  const w = 200;
  const h = 100;
  const padding = 2;
  const dataset = [5, 10, 15, 20, 25];

  useEffect(() => {
    const barGraph = d3.select(barGraphRef.current);

    barGraph
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
          .attr("x", function(data, i) {
            return (i * (w / dataset.length));
          })
          .attr("y", function(data) { return h - ( data * 2.5 )}) // adjusts orientation of bars
          .attr("width", (w / dataset.length - padding))
          .attr("height", function(data) { 
            return (data * 2.5) 
          })



  },[])






  return (
    <>
    <div className='page-title'>Bar Graph Demo</div>
    <div className='content-container'>
      <div ref={barGraphRef}></div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p>
    </div>
    </>
  
  )
}