import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import Card from './Card'
import Review from './Review'
import './PlaceInfo.css'
import 'leaflet/dist/leaflet.css'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

export default function PlaceInfo(props){
    
    const testInfo = [
        {
            nombre: "Tangamandapio",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet animi officiis quis aperiam necessitatibus adipisci provident deleniti velit blanditiis facere cum non autem nulla, tempore doloribus nesciunt! Officia, culpa! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quibusdam cumque doloribus, repellendus ipsa sint expedita! Ex, possimus eveniet harum sit expedita quis a eaque asperiores, blanditiis ullam omnis impedit!",
            puntuacion: 3.5,
        }
    ]

    const markers = [
        {
            geocode: [19.4326, -99.1332],
            popUp : "Zócalo de la CDMX"
        },
        {
            geocode: [19.434376193008248, -99.13308591837603],
            popUp: "Catedral Metropolitana"
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
                            <div className="reviews--container">
                                <Review />
                                <Review />
                                <Review />
                                <Review />
                                <Review />
                            </div>
                            <div className="campoTexto">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Tu reseña (Máximo 1500 caracteres)"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <button className="btn-sendReview">Enviar</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <section className="place--map">
                    <div>
                        <h2>UBICACIÓN</h2>
                    </div>
                    <MapContainer center={[19.4326, -99.1332]} zoom={19}>
                        <TileLayer
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers.map((marker) =>(
                                <Marker position={marker.geocode}>
                                    <Popup>{marker.popUp}</Popup>
                                </Marker>
                        ))
                        }
                    </MapContainer>
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