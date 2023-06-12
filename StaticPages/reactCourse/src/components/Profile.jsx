import React,{useEffect, useState} from "react"
import './Profile.css'
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import Save from '@mui/icons-material/SaveOutlined';
import Select from "react-select";

export default function Profile(){
    const  navigate=useNavigate();

    const [userData, setUserData] = useState("");
    const [user,setUser]=useState({NombreUsuario:"",
                            PassUsuario: "",
                            Personalidad_idPersonalidad: "",
                            E:0, I:0, S:0, N:0,F:0,T:0,P:0, J:0
                            })

    const[currentPers,setCurrentPers]=useState({value:0, label:'none'});
    const[personality,setPersonality]=useState();

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

    function handlePersonality(e){
        console.log(e)
        setCurrentPers(e)
        setPersonality(e.value)
    }

    const initialPersonality = options.find(option => option.value == user.Personalidad_idPersonalidad)

    const Personality = () => (
        <Select 
            options={options}
            placeholder="Selecciona tu personalidad..."
            onChange={handlePersonality}
            value={currentPers.value!=0 ? currentPers: initialPersonality}
            required
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    paddingLeft: '0',
                    WebkitTextFillColor: 'white',
                    border: '2px',
                    backgroundColor: 'transparent',
                }),
            }}
        />
    )

    const getData = (dataNav) => {
        setUserData(dataNav)
    }

    const destroyCookie = () =>{
        axios.get("/api/Destroy")
        .then((response) =>
        navigate("/") )
    }

    const updateUser = (event) => {
        event.preventDefault()
        const  oldUserName = user.NombreUsuario
        const userName = event.target.user.value
        const pas = event.target.pass.value
        
        axios.put("/api/UpdateU", {userName,pas,personality,oldUserName})
        .then(res => alert(res.data))
    }

    useEffect(()=>{
        axios.get("/api/GetIdu",{withCredentials: true})
        .then((res)=>{
            console.log(res.data[0]);
            setUser(res.data[0])
        })
    },[]);

    return(
        <div className="general--container">
            <Navbar getData={getData} />
            <section className="login--container" id="profile--container">
                <div className="login--box">
                    <div className="login--value">
                        <form onSubmit={updateUser}>
                            <h2 className="login--title">¡Hola {userData}!</h2>
                            <div className="inputbox">
                                <input type="text" name="user" defaultValue={user.NombreUsuario} required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" name="pass" defaultValue={user.PassUsuario} required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="inputbox">
                                <Personality />
                            </div>
                            <button className="formButton"><Save />Guardar</button>
                            <div className="close--sesion" onClick={()=>{destroyCookie()}}>
                                <p>Cerrar sesion</p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}