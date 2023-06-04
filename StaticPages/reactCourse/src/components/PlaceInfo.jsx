import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import Card from './Card'
import './PlaceInfo.css'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PlaceInfo(){
    
    const testInfo = [
        {
            nombre: "San Juan de la Verga",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet animi officiis quis aperiam necessitatibus adipisci provident deleniti velit blanditiis facere cum non autem nulla, tempore doloribus nesciunt! Officia, culpa! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quibusdam cumque doloribus, repellendus ipsa sint expedita! Ex, possimus eveniet harum sit expedita quis a eaque asperiores, blanditiis ullam omnis impedit!",
            puntuacion: 3.5,
        }
    ]

    return(
        <div className="general--container">
            <Navbar />
            <section   section className="placeInfo">
                <div className="place--container">
                    <h2>{testInfo[0].nombre}</h2>
                    <div className="place--conColumns">
                        <div className="place--containerL">
                            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"/>
                            <p className="place--desc">{testInfo[0].descripcion}</p>
                        </div>
                        <div className="place--containerR">
                            <h3>Puntuación de los usuarios</h3>
                            <div className="place--rating">
                                <Rating name="test" defaultValue={2.5} precision={0.5} size="large" onChange={(e, value) => console.log(value)}/>
                                <span> [{testInfo[0].puntuacion}]</span>
                            </div>
                            <h3>Reseñas de los usuarios</h3>
                            <p>RESEñAS Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quod aliquid minima dolorem minus amet optio explicabo pariatur nisi, natus accusantium quaerat ipsum, facere adipisci quia neque. Officiis, distinctio quis.</p>
                            <div className="campoTexto">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Tu reseña (Máximo 1500 caracteres)"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                />
                                <button className="btn-sendReview">Enviar</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <section className="place--map">
                    <h1>MAPA</h1>
                    <img src="https://depor.com/resizer/tWkgaFkRSfQvJrxQJP3zxVe35K4=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/DOSTJYG5PVBK3ELX3UXALXJYPQ.jpg" />
                </section>
                <section className='place--recomended'>
                    <h1 className='place--recomended-title'>
                        ¡Descubre otros lugares que coinciden con tu personalidad!  
                    </h1>
                    <section className='cards'>
                        <Card />
                        <Card />
                        <Card />
                    </section>
                </section>
            </section>
            <Footer />
        </div>
    )
}