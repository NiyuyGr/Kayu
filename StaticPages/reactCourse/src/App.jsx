import { useEffect, useState } from 'react'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import PlaceInfo from './components/PlaceInfo'
import CRUDU from './components/CRUDU';
import CRUDL from './components/CRUDL'
import OpAdmin from './components/OpAdmin';
import CreateU from './components/CreateU';
import CreateP from './components/CreateP';
import ViewP from './components/ViewP';
import UpdateP from './components/UpdateP'
import axios from 'axios';
import { Route, Routes ,useNavigate} from 'react-router-dom';
import { ProtectedRouteAdmin,ProtectedRouteUser } from './components/ProtectedRoute'

function App() {
  
  //<Landing />
    
    const [usuario,setUser]=useState("");
    const navigate=useNavigate()
    useEffect( () => {  
     
    axios.get("/api",{withCredentials: true})
      .then((response) => { 
     setUser(response.data)
      
    }) 
    if(usuario=="admin"){
      navigate("/OpAdmin")
    }
    if(usuario !="admin" && usuario != ""){
      navigate("/PlaceInfo")
    }
    
    
    
},[usuario]);

  
  return (
    <>    
    <Routes>
      {/*Rutas publicas*/}
      <Route path="/" element = {<Landing />} />
      <Route path="/Login" element = {<Login />} />
      <Route path="/Register" element = {<Register />} />
      
      <Route path="/" element = {<ProtectedRouteUser user={usuario} />} >
        <Route path="/Landing" element = {<Landing />} />
        <Route path="/PlaceInfo" element = {<PlaceInfo />} />
      </Route>
      {/*Rutas admin*/}
      
      <Route path="/" element = {<ProtectedRouteAdmin user={usuario} />} >
        <Route path="/OpAdmin" element = {<OpAdmin />} />
        <Route path="/OpAdmin/CRUDU" element = {<CRUDU />} />
        <Route path="/OpAdmin/CRUDL" element = {<CRUDL />} />
        <Route path="/OpAdmin/CRUDU/CreateU" element = {<CreateU />} />
        <Route path="/OpAdmin/CRUDL/CreateP" element = {<CreateP />} />
        <Route path="/OpAdmin/CRUDL/ViewP/:idLugar" element = {<ViewP />} />
        <Route path="/OpAdmin/CRUDL/UpdateP/:idLugar" element = {<UpdateP />} />
      </Route>
      {/*Rutas usuario reistrado*/}
    </Routes>

    </>
  )
}

export default App
