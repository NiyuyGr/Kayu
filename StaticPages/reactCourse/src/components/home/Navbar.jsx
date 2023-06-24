import React,{useEffect, useState} from "react"
import axios from "axios";
import './css/Navbar.css'
import { useNavigate, Link, useLocation } from "react-router-dom"

export default function Navbar({getData}){
    const  navigate=useNavigate();
    const [usuario,setUser]=useState("")
    let user = usuario
    if(usuario.length > 10){
      user = usuario.substring(0,10) + "..."
    }
    
    const url = useLocation()

    if(url.pathname == "/Profile"){
      getData(usuario)
    }
    
    useEffect( () => {  
      axios.get("/api",{withCredentials: true})
      .then((response) => { 
        setUser(response.data)
      }) 
        if(usuario=="admin"){
          document.querySelectorAll("h2").forEach(a=>a.style.display = "none");
          document.querySelectorAll(".admin--close").forEach(a=>a.style.display = "flex");
        }
        else if(usuario !="admin" && usuario !=""){
          document.querySelectorAll(".nav--element").forEach(a=>a.style.display = "none");
          document.querySelectorAll(".nav--elementLog").forEach(a=>a.style.display = "initial");
          document.querySelectorAll(".admin--close").forEach(a=>a.style.display = "none");
        }
        else{
          document.querySelectorAll(".nav--element").forEach(a=>a.style.display = "initial");
          document.querySelectorAll(".nav--elementLog").forEach(a=>a.style.display = "none");
          document.querySelectorAll(".admin--close").forEach(a=>a.style.display = "none");
        }
    },[usuario]);

    const destroyCookie = () =>{
      axios.get("/api/Destroy")
      .then((response) =>
      navigate("/") )
    }

    return(
    
    <nav className="nav">
        <Link className='nav--title' to="/">Kayú</Link>
        <h2 className='nav--meet' onClick={() => {navigate('/')}}>Conócenos</h2>
        <h2 className='nav--elementLog' onClick={() => {navigate('/Recomendations')}}>Recomendaciones</h2>
        <h2 className='nav--elementLog nav--profile' onClick={() => {navigate('/Profile')}}><span id="nav--usuario">Hola {user}</span><span id="nav--perfil" >Ver perfil</span></h2>
        <h2 className="nav--elementLog admin--close" onClick={()=>{destroyCookie()}}>Cerrar sesión</h2>
        <h2 className='nav--element' onClick={() => {navigate('/Login')}}>Inicia sesión</h2>
        <h2 className='nav--element nav--register' onClick={() => {navigate('/Register')}}>Regístrate</h2>
    </nav>
    )
}