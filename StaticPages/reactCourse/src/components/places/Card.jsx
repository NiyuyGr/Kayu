import React from "react";
import './css/Card.css'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"

export default function Card(props){

    const testEtiquetas = [
        {nombre:props.Tipo},
        
    ]

    return(
        <Link to="/PlaceInfo" state={{idLugar: props.idLugar, latitud: props.Latitud, longitud: props.Longitud}} class="card">
            <img src={props.Imagenes} class="card-image" />
            <div class="category"> [Ubicacion del lugar] </div>
            <div class="heading"> 
                <div>{props.Nombre}</div>
                <div class="author">| {testEtiquetas.map((etiqueta) => (etiqueta.nombre + " | "))} </div>
            </div>
        </Link>
    )
}