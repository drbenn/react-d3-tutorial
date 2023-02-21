import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./scss/GraphicsContainer.scss";
import { csv } from "d3";

export default({Graphic, url}) => {
  const myRef = useRef();
  const [state, setState] = useState({
    data: null
  })

  useEffect(() => {
    const fetchData = async function() {
      const data = await d3.csv(url, r=> ({
        ...r,
        ...Object.fromEntries(
          [1,2,3,4,5,6,7,8,9,10,11,12].map(
            (m => [m, +r[m]])
          )
        )
      }))
      setState(s => ({ ...s, data }))
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(!state.data){
      return;
    }
    const graphic = new Graphic(myRef.current, state.data);
    graphic.render();
    console.log(d3.select(myRef.current));
  }, [state.data])

  return (
    <div className="graphics-element">
      <div ref={myRef} className="graphics-container"></div>
    </div>
  )

}