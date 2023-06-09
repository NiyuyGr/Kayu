import React from "react";
import './Card.css'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"

export default function Card(props){

    const testEtiquetas = [
        {nombre: "Parque"},
        {nombre: "Museo"},
        {nombre: "Galeria"}
    ]

    return(
        <Link to="/PlaceInfo" state={{idLugar: props.idLugar}} class="card">
            <img src={props.Imagenes} class="card-image" />
            <div class="category"> [Ubicacion del lugar] </div>
            <div class="heading"> {props.Nombre}
                <div class="author">| {testEtiquetas.map((etiqueta) => (etiqueta.nombre + " | "))} </div>
            </div>
        </Link>
    )
}