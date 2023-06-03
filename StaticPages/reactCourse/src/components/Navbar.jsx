import React from "react"
import './Navbar.css'
import {useNavigate} from "react-router-dom"
export default function Navbar(){
    const  navigate=useNavigate();
    return(
    <nav className="nav">
        <h1 className='nav--title' onClick={() => {navigate('/')}} >Kayú</h1>
        <h2 className='nav--info'>Conócenos</h2>
        <h2 className='nav--login' onClick={() => {navigate('/Login')}}>Inicia sesión</h2>
        <h2 className='nav--register' onClick={() => {navigate('/Register')}}>Regístrate</h2>
    </nav>
    )
}