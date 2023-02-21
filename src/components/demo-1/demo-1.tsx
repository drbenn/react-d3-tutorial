import './demo-1.scss';
import GraphicsContainer from "./GraphicsContainer"
import { Treemap } from "./classes/Treemap"


// https://www.youtube.com/watch?v=KK7X9rycaDU
export function Demo1() {
  return (
    <>
    <div className='page-title'>Demo1</div>
    <div className='content-container'>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit ipsa, necessitatibus aperiam architecto doloremque deleniti hic deserunt ad maiores cumque molestiae amet officia corrupti.
      </p>
      <p>yarn add d3 & yarn add @types/d3</p>

      <div>
        <GraphicsContainer Graphic={Treemap} url="https://raw.githubusercontent.com/noe-lc/about-me/master/src/data/product_data.csv"/>
      </div>
    </div>
    </>
  
  )
}