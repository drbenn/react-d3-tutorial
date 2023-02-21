import './App.css'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { Navbar } from './components/navbar/navbar'
import { Home } from './components/home/home'
import { One } from './components/one/one'
import { Two } from './components/two/two'
import { Demo1 } from './components/demo-1/demo-1'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div className='routes-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/demo1" element={<Demo1 />} /> */}
          <Route path="/one" element={<One />} />
          <Route path="/two" element={<Two />} />
        </Routes>
      </div>
    </>

  )
}

export default App
