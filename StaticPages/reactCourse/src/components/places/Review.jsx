import React from "react"
import './css/Review.css'
import Rating from '@mui/material/Rating'
export default function Review(props) {
            //Dondende props va a ser id del lugar
           
    return(
        
        <div className="review">
           
            <p className="review--username">{props.data.Usuario} <Rating name="test" defaultValue={props.data.Puntuacion} precision={0.5}  /> </p>
            <p className="review--review">{props.data.Comentario}</p>
        </div>
    )
}