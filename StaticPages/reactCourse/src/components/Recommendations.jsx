import React, { useEffect,useState } from "react"
import './Recommendations.css'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Card from "./Card"
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom"

export default function Recomendations(){
    
    const[placeList,setPlaceList] = useState([]);

    useEffect( () => {
        axios.get('/api/CrudL/')
        .then((response) => {
            setPlaceList(response.data);
            console.log(placeList)
        })  
    },[])

    const recomendationCards =  placeList.map(placeInfo =>{
        return(
            <Card
                key = {placeInfo.id}
                {...placeInfo}
            />
        )
    })
    
    return(
        <div className="general--container reco">
            <Navbar/>
            <section className="recommendation">
                <h1 className="landing--recomended-title">¡Estas son tus recomendaciones!</h1>
                <div className="reco--cards">{recomendationCards} </div>
            </section>
            <Footer/>
        </div>
    )
}