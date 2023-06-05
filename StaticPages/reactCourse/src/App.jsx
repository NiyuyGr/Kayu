import { useEffect, useState } from 'react'
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
import { Route, Routes ,useNavigate} from 'react-router-dom';
import axios from 'axios'
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
    }else{
      navigate("/")
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
        <Route path="/OpAdmin/CRUDU/UpdateU/:nameUser" element = {<UpdateU />} />
        <Route path="/OpAdmin/CRUDU/CreateU" element = {<CreateU />} />
        <Route path="/OpAdmin/CRUDU/ViewU/:nameUser" element = {<ViewU />} />
      </Route>
      {/*Rutas usuario reistrado*/}
    </Routes>

    </>
  )
}

export default App
