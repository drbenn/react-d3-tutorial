import './navbar.scss';
import { Link, NavLink } from "react-router-dom"

export function Navbar() {
  return (
    <>
      <div className='nav-container'>
          <NavLink to=""><div className='nav-title'>D3.js in React</div></NavLink>
        <div>
          <ul>
            <li><NavLink to="">Info</NavLink></li>
            {/* <li><NavLink to="demo1">Demo 1</NavLink></li> */}
            <li><NavLink to="one">Basic Bar/UseRef</NavLink></li>
            <li><NavLink to="two">Bar Graph Demo</NavLink></li>
            <li><NavLink to="three">Full Chart</NavLink></li>

          </ul>
        </div>
      </div>
    </>
  )
}