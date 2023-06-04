import React,{useState} from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'


export default function Register(){
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const[personality,setPersonality]=useState('');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('/api/Register', {name,password,personality})
        .then((res) => {alert(res.data) 
            navigate('/Login')
        })
        .catch(err => console.log(err));

        }
    return(
        <div className="general--container">
            <Navbar />
            <section className="register--container">
                <div className="register--box">
                    <div className="register--value">
                        <form onSubmit={handleSubmit}>
                            <h2 className="register--title">Registro</h2>
                            <div className="inputbox">
                                <input type="text" onChange={e=>setName(e.target.value)} required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" onChange={e=>setPassword(e.target.value)} required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="inputbox">
                                <input type="text" onChange={e=>setPersonality(e.target.value)} required />
                                <label htmlFor="">Personalidad</label>
                            </div>
                            <div className="register--personality">
                                <p> ¡Conoce tu personalidad <a href="https://www.16personalities.com/es/test-de-personalidad" target="blank"> aquí!</a></p>
                            </div>
                            <button>Registrarse</button>
                            <div className="login">
                                <p>¿Ya tienes una cuenta?<a href="/Login"> ¡Inicia sesión!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}