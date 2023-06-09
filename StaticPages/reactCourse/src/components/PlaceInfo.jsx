import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import Navbar from './Navbar'
import Footer from './Footer'
import Card from './Card'
import Review from './Review'
import './PlaceInfo.css'
import 'leaflet/dist/leaflet.css'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'



export default function PlaceInfo(props){
    const[ReviewList,setReviewList]=useState([]);
    var[Puntuacion,setPuntuacion]=useState("");
    var[Comentario,setComentario]=useState("");
    const[valoracion,setValoracion]=useState("");
    const [infoPlace, setInfoPlace]=useState({})

    const location = useLocation()
    const idLugar = location.state.idLugar

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

    useEffect(()=>{
        //modificar a props
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            axios.post("/api/Reviews",{idLugar})
            .then((res) => setReviewList(res.data) 
                )
            axios.post("/api/PuntuacionG",{idLugar})
            .then((res) =>{
                var val=((res.data[0].suma)/res.data[0].cuenta)
                setValoracion(val.toFixed(2))
            })
            axios.get("api/GetId/"+ idLugar)
            .then((res) =>{
                setInfoPlace(res.data[0])
                console.log(res.data)
            })
    },[])

        const sendReview=()=> {
            if(Puntuacion =="") Puntuacion=3.5;
            if(Comentario =="") Comentario="[Este usuario no dejo comentarios]";
            axios.post("/api/Review",{Puntuacion,Comentario,idLugar})
            .then((res)=>{
                
                    setPuntuacion("")
                    setComentario("")
                
                var idReseña=res.data[0].idReseña
                
                    if(res.data=="Error"){
                        console.log("No se pudo Subir la reseña")
                    }
                    axios.post("/api/SaveR",{idReseña,idLugar})
                    .then((result)=>{
                    
                    })
                
                })
            }
        
    function MyComponent() {
            const map = useMapEvent('locationfound', () => {
                map.setView([infoPlace.Latitud,infoPlace.Longitud], map.getZoom())
            })
            return null
    }
    
    return(
        <div className="general--container">
            <Navbar />
            <section   section className="placeInfo">
                <div className="place--container">
                    <h2>{infoPlace.Nombre}</h2>
                    <div className="place--conColumns">
                        <div className="place--containerL">
                            <img src={infoPlace.Imagenes}/>
                            <p className="place--desc">{infoPlace.Descripcion}</p>
                        </div>
                        <div className="place--containerR">
                            <h3>Puntuación de los usuarios</h3>
                            <div className="place--rating">
                                
                                <Rating name="test" value={valoracion} precision={0.5} size="large" onChange={(e, value) =>{ setPuntuacion(e.target.value)
                                    console.log(value)}}/>
                                <span> [{valoracion}]</span>
                            </div>
                            <h3>Reseñas de los usuarios</h3>
                            <div className="reviews--container">
                                { ReviewList != [] ? 
                                ReviewList.map((val) =>{
                                   return <Review key={val.idReseña} data={{Usuario:val.NombreUsuario,Puntuacion:val.Puntuacion,Comentario:val.Comentario}}/>  
                                }): <div></div>}
                                
                            </div>
                            <div className="campoTexto">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Tu reseña (Máximo 1500 caracteres)"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    onChange={e=>setComentario(e.target.value)}
                                />
                                <button className="btn-sendReview" onClick={()=>sendReview()}>Enviar</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <section className="place--map">
                    <div>
                        <h2>UBICACIÓN</h2>
                    </div>
                    <MapContainer center={[0,0]} zoom={19}>
                        <MyComponent />
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