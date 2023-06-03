import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import './Register.css'

export default function Register(){
    return(
        <div className="general--container">
            <Navbar />
            <section className="register--container">
                <div className="register--box">
                    <div className="register--value">
                        <form action="">
                            <h2 className="register--title">Registro</h2>
                            <div className="inputbox">
                                <input type="text" required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="inputbox">
                                <input type="text" required />
                                <label htmlFor="">Personalidad</label>
                            </div>
                            <div className="register--personality">
                                <p> ¡Conoce tu personalidad <a href="https://www.16personalities.com/es/test-de-personalidad" target="blank"> aquí!</a></p>
                            </div>
                            <button>Registrarse</button>
                            <div className="login">
                                <p>¿Ya tienes una cuenta?<a href="#"> ¡Inicia sesión!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}