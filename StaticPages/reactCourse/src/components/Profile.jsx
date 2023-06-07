import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"

export default function Profile(){
    const  navigate=useNavigate();
    const destroyCookie = () =>{
        axios.get("/api/Destroy")
        .then((response) =>
        navigate("/") )
    }

    return(
        <div className="general--container">
            <Navbar />
            <div onClick={()=>{destroyCookie()}}>
                Cerrar sesion
            </div>
            <Footer />
        </div>
    )
}