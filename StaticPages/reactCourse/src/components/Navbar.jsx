import React,{useEffect, useState} from "react"
import axios from "axios";
import './Navbar.css'
import { useNavigate, Link } from "react-router-dom"
export default function Navbar(){
    const  navigate=useNavigate();
    const [usuario,setUser]=useState("")
    
    useEffect( () => {  
     
        axios.get("/api",{withCredentials: true})
          .then((response) => { 
         setUser(response.data)
            
        }) 
    
        if(usuario=="admin"){
            navigate("/OpAdmin")
          }
          if(usuario !="admin" && usuario !=""){
            navigate("/PlaceInfo")
          }
          
        
    },[usuario]);

    return(
    
    <nav className="nav">
        
        <Link className='nav--title' to="/">Kayú</Link>
        
        <h2 className='nav--info'>Conócenos</h2>
        <h2 className='nav--login' onClick={() => {navigate('/Login')}}>Inicia sesión</h2>
        <h2 className='nav--register' onClick={() => {navigate('/Register')}}>Regístrate</h2>
    </nav>
    )
}