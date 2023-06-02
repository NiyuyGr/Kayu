import React from "react"
import './Navbar.css'

export default function Navbar(){
    return(
    <nav>
        <h1 className='nav--title'>Kayú</h1>
        <h2 className='nav--info'>Conócenos</h2>
        <h2 className='nav--login'>Inicia sesión</h2>
        <h2 className='nav--register'>Regístrate</h2>
    </nav>
    )
}