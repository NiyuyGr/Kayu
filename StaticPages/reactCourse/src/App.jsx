import { useState } from 'react'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import PlaceInfo from './components/PlaceInfo'
import { Route, Routes } from 'react-router-dom';

function App() {
  
  //<Landing />
  
  return (
    <>    
    <Routes>
      <Route path="/" element = {<Landing />} />
      <Route path="/Login" element = {<Login />} />
      <Route path="/Register" element = {<Register />} />
      <Route path="/PlaceInfo" element = {<PlaceInfo />} />
    </Routes>

    </>
  )
}

export default App
