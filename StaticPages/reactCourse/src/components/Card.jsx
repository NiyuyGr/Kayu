import React from "react";
import './Card.css'

export default function Card(props){

    const testEtiquetas = [
        {nombre: "Parque"},
        {nombre: "Museo"},
        {nombre: "Galeria"}
    ]

    return(
        <div class="card">
            <div class="card-image"></div>
            <div class="category"> [Ubicacion del lugar] </div>
            <div class="heading"> [Nombre del lugar]
                <div class="author">| {testEtiquetas.map((etiqueta) => (etiqueta.nombre + " | "))} </div>
            </div>
        </div>
    )
}