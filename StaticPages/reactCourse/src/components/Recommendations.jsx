import React, { useEffect,useState } from "react"
import './Recommendations.css'
import Navbar from "./Navbar"
import Footer from "./Footer"
import Card from "./Card"
import axios from "axios";


export default function Recomendations(){
    
    const[placeList,setPlaceList] = useState([]);
    const [user,setUser]=useState({NombreUsuario:"",
                            PassUsuario: "",
                            Personalidad_idPersonalidad: 0,
                            E:0, I:0, S:0, N:0,F:0,T:0,P:0, J:0
                            })
    const [personality,setPersonality] = useState("")

    const options = [
        { value: 1, label: 'INTJ' },
        { value: 2, label: 'INTP' },
        { value: 3 , label: 'ENTJ' },
        { value: 4 , label: 'ENTP' },
        { value: 5 , label: 'INFJ' },
        { value: 6 , label: 'INFP' },
        { value: 7 , label: 'ENFJ' },
        { value: 8 , label: 'ENFP' },
        { value: 9 , label: 'ISTJ' },
        { value: 10 , label: 'ISFJ' },
        { value: 11 , label: 'ESTJ' },
        { value: 12 , label: 'ESFJ' },
        { value: 13 , label: 'ISTP' },
        { value: 14 , label: 'ISFP' },
        { value: 15 , label: 'ESTP' },
        { value: 16 , label: 'ESFP' },
    ]

    useEffect( () => {
        /* axios.get('/api/CrudL/')
        .then((response) => {
            setPlaceList(response.data);
            console.log(placeList)
        }) */
        axios.get("/api/GetIdu",{withCredentials: true})
        .then((res)=>{
            console.log(res.data[0]);
            const test = res.data[0]
            setUser(res.data[0])
            setPersonality(options.find(opt => opt.value == res.data[0].Personalidad_idPersonalidad).label )
            if(true){
                axios.post('/api/getReco/',{test}).then((response)=>{
                    console.log("qlq",response.data)
                    setPlaceList(response.data);
                    console.log(placeList)
                })
            }
        })
    },[])


    const recomendationCards =  placeList.map(placeInfo =>{
        return(
            <Card
                key = {placeInfo.idLugar}
                {...placeInfo}
            />
        )
    })
    
    return(
        <div className="general--container reco">
            <Navbar/>
            <section className="recommendation">
                <h1 className="landing--recomended-title">¡Explora tus recomendaciones personalizadas como {personality}!</h1>
                <div className="reco--cards">{recomendationCards} </div>
            </section>
            <Footer/>
        </div>
    )
}