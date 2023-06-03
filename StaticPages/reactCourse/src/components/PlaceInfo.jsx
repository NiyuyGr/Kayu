import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import Card from './Card'

export default function PlaceInfo(){
    return(
        <div className="general--container">
            <Navbar />
            <section>
                <div className="place--container">
                    <h2>[Nombre del lugar]</h2>
                    <img src=""/>
                    <p className="place--desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat provident culpa assumenda accusantium, mollitia doloremque quos eveniet quo, porro quod aliquid. Error, tempore ducimus? Labore qui unde magni iure voluptates?</p>
                </div>
                <div className="place--map">
                    MAPA
                </div>
                <div>
                    <h2>¡Descubre otros lugares que coinciden con tu personalidad!</h2>
                    <div>
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}