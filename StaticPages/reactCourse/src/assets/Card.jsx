import React from "react";
import './Card.css'

export default function Card(){

    return(
        <div class="card">
            <div class="card-image"></div>
            <div class="category"> [Ubicacion del lugar] </div>
            <div class="heading"> [Nombre del lugar]
                <div class="author"> [Etiquetas] </div>
            </div>
        </div>
    )
}