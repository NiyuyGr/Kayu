import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import './Login.css'

export default function Login(){
    return(
        <div className="general--container">
            <Navbar />
            <section className="login--container">
                <div className="login--box">
                    <div className="login--value">
                        <form action="">
                            <h2 className="login--title">Log In</h2>
                            <div className="inputbox">
                                <input type="text" required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <button>Conectarse</button>
                            <div className="register">
                                <p>¿Aún no tienes cuenta?<a href="#"> ¡Regístrate!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}