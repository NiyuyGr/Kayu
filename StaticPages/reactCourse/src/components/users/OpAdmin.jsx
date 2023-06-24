import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
import './css/OpAdmin.css'


function OpAdmin() {
    const navigate= useNavigate();
    return (

    <div className='general--container crud--container'>
        <Navbar />
        <section className='crud'>
            <form className='crud--opc'>
            <div className='crud--btn' onClick={() => navigate('./CRUDU')}>
                <h1>Administrar Usuarios</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/33/33308.png" />
            </div>
            <div className='crud--btn' onClick={() => navigate('./CRUDL')}>
                <h1>Administrar Lugares</h1>
                <img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-place_90615.png" />
            </div>
            </form>
        </section>
        <Footer />
    </div>
    )
}

export default OpAdmin