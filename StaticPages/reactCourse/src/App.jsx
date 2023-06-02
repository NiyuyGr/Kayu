import { useState } from 'react'
import Landing from './components/Landing'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';

function App() {
  
  //<Landing />
  
  return (
    <>    
    <Routes>
      <Route path="/" element = {<Landing />} />
      <Route path="/Login" element = {<Login />} />
    </Routes>

    </>
  )
}

export default App
