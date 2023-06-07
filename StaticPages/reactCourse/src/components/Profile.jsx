import React,{useState} from "react"
import './Profile.css'
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import Save from '@mui/icons-material/SaveOutlined';

export default function Profile(){
    const  navigate=useNavigate();

    const [userData, setUserData] = useState("");

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
        const name = event.target.user.value
        const pass = event.target.pass.value
        const pers = event.target.pers.value
        axios.put("/api/UpdateU", {name,pass,pers,userData})
        .then(res => alert("Usuario modificado"))
    }

    return(
        <div className="general--container">
            <Navbar getData={getData} />
            <section className="login--container" id="profile--container">
                <div className="login--box">
                    <div className="login--value">
                        <form onSubmit={updateUser}>
                            <h2 className="login--title">¡Hola {userData}!</h2>
                            <div className="inputbox">
                                <input type="text" name="user" defaultValue="test" required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" name="pass" defaultValue="test" required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="inputbox">
                                <input type="text" name="pers" defaultValue="test" required/>
                                <label htmlFor="">Personalidad</label>
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