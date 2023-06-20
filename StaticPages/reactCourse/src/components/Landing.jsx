import React,{useEffect,useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Card from './Card'
import axios from 'axios'
import './Landing.css'

function Landing() {
    const[placeList,setPlaceList]=useState([]);
    useEffect(()=>{
        axios.get("api/Get3P").then((res)=>{
            setPlaceList(res.data);
            console.log(res.data)
        })
    },[])
    return (
        <div className='general--container'>
            <Navbar />
            <section className='landing--initial'>
                <div className='landing--upperInfo'>
                <div className='landing--fColumn'>
                    <h1 className='landing--title'>Kayú</h1>
                    <div className="landing--info">
                        <p>Kayú es una plataforma con un sistema de recomendaciones personalizadas basadas en el perfil de cada uno de nuestros usuarios.</p>
                        <p className='bold'>¡Regístrate  ahora y comienza a disfrutar de las facilidades que Kayú tiene para ti</p>
                    </div>
                </div>
                <img src='https://cooperandoando.com/media/2017/09/28-Turismo.png' className='landing--img'/>
                </div>
            </section>
            <section className='landing--recomended'>
                <h1 className='landing--recomended-title'>
                    Conoce los sitios que más se recomiendan a nuestros usuarios
                </h1>
            </section>
            <section className='cards'>
                {
                    placeList.map(PlaceInfo=>{
                        return(<Card key={PlaceInfo.idLugar}{...PlaceInfo}/>)
                    })
                }
            </section>
            <Footer />
        </div>
    )
}

export default Landing