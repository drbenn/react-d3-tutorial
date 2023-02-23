import './one.scss';
import { useRef, useEffect } from 'react';
import * as d3 from "d3";

export function One() {
  const svgBarRef = useRef(null);
  const width = 50;
  const height = 200;

  const svgCircleRef = useRef(null)

  const svgTextRef = useRef(null)

  useEffect(() => {
    const svgBar = d3.select(svgBarRef.current);
    svgBar
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "blue")
  },[])

  useEffect(() => {
    const svgCircle = d3.select(svgCircleRef.current);
    svgCircle
      .append("svg")
        .attr("width", 50)
        .attr("height", 50)
      .append("circle")
        .attr("cx",25)
        .attr("cy",25)
        .attr("r",25)
        .style("fill", "purple")
  },[])

  useEffect(() => {
    const svgText = d3.select(svgTextRef.current);
    svgText
      .append("text")
        .text("D3 TEXT")
        .attr("y", 25)
        .attr("x", 0)
        .style("fill", "blue")
  },[])

  return (
    <>
    <div className='page-title'>Basic Shapes/UseRef</div>
    <div className='content-container'>


      <h3>SVG Bar</h3>
      <svg>
        <rect width="50" height="200" fill='blue'/>
      </svg>
      <h3>D3 Bar</h3>
      <svg ref={svgBarRef}></svg>  


      <h3>SVG Circle</h3>
      <svg width="50" height="50">
        <circle cx="25" cy="25" r="25" fill="blue"/>
      </svg>
      <h3>D3 Circle</h3>
      <div ref={svgCircleRef}></div>   


      <h3>SVG Text</h3>
      <svg width="250" height="50">
        <text x="0" y="25">SVG TEXT</text>
      </svg>
      <h3>D3 Text</h3>
      <svg width="100" height="75" ref={svgTextRef}></svg>  

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p> 


    </div>
    </>
  
  )
}