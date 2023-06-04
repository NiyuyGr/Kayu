import React,{useState} from "react";
import { Link } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import './Login.css'

export default function Login(){
    const[user,setUser]=useState('');
    const[password,setPassword]=useState('');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3030/Login', {user, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        }
    return(
        <div className="general--container">
            <Navbar />
            <section className="login--container">
                <div className="login--box">
                    <div className="login--value">
                        <form onSubmit={handleSubmit}>
                            <h2 className="login--title">Log In</h2>
                            <div className="inputbox">
                                <input type="text" onChange={e=>setUser(e.target.value)} required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" onChange={e=>setPassword(e.target.value)} required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <button className="formButton">Conectarse</button>
                            <div className="register">
                                <p>¿Aún no tienes cuenta? <Link to="/Register">¡Regístrate!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}