import { useState } from 'react'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import PlaceInfo from './components/PlaceInfo'
import CRUDU from './components/CRUDU';
import CRUDL from './components/CRUDL'
import OpAdmin from './components/OpAdmin';
import UpdateU from './components/UpdateU';
import CreateU from './components/CreateU';
import ViewU from './components/ViewU'
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
      <Route path="/OpAdmin" element = {<OpAdmin />} />
      <Route path="/OpAdmin/CRUDU" element = {<CRUDU />} />
      <Route path="/OpAdmin/CRUDL" element = {<CRUDL />} />
      <Route path="/OpAdmin/CRUDU/UpdateU/:nameUser" element = {<UpdateU />} />
      <Route path="/OpAdmin/CRUDU/CreateU" element = {<CreateU />} />
      <Route path="/OpAdmin/CRUDU/ViewU/:nameUser" element = {<ViewU />} />
    </Routes>

    </>
  )
}

export default App
