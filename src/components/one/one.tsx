import './one.scss';
import { useRef, useEffect } from 'react';
import * as d3 from "d3";

export function One() {
  const svgRef = useRef(null);
  const width = 50;
  const height = 200;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "blue")
  },[])

  return (
    <>
    <div className='page-title'>Basic Bar/UseRef</div>
    <div className='content-container'>
      <h3>SVG Bar</h3>
      <svg>
        <rect width="50" height="200" fill='blue'/>
      </svg>
      <h3>D3 Bar</h3>
      <svg ref={svgRef}></svg>     
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p>
    </div>
    </>
  
  )
}