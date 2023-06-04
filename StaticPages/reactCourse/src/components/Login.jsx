import React,{useState} from "react";
import { Link } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import './Login.css'
import { useNavigate } from "react-router-dom";

export default function Login(){
    const[user,setUser]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();

    
    function handleSubmit(event){
        event.preventDefault();
        axios.post("/api/Login", {user, password},{withCredentials:true})
        .then(res =>{
            console.log(res);
            if(res.data.Login){
                alert("Sesion iniciada con Exito")
                document.cookie;
                if(res.data.User != "admin"){
                    navigate('/');
                }else{
                    navigate('/OpAdmin')
                }

                
            }else{
                alert("Error en inicio de sesion")
            }
        } 
            )
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