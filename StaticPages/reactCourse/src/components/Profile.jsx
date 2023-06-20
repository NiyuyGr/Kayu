import React,{useEffect, useState} from "react"
import './Profile.css'
import './Register.css'
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import Save from '@mui/icons-material/SaveOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from "react-select";

export default function Profile(){
    const  navigate=useNavigate();

    const [userData, setUserData] = useState("");
    const [user,setUser]=useState({NombreUsuario:"",
                            PassUsuario: "",
                            Personalidad_idPersonalidad: "",
                            E:0, I:0, S:0, N:0,F:0,T:0,P:0, J:0
                            })

    const[currentPers,setCurrentPers]=useState({value:0, label:'ABCD'});
    const[personality,setPersonality]=useState();
    const[cogValues, setCogValues] = useState({P:0,S:0,T:0,C:0})
    const[open,setOpen]=useState({success: false, error: false});

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

    function handleSubmit(event){
        event.preventDefault();
        console.log(cogValues)
        let E,I,N,S,F,T,P,J
        if(currentPers.label[0] == 'E'){
            I = 100 - cogValues.P
            E = cogValues.P
        }else{
            E = 100 - cogValues.P
            I = cogValues.P
        }
        if(currentPers.label[1] == 'N'){
            S = 100 - cogValues.S
            N = cogValues.S
        }else{
            N = 100 - cogValues.S
            S = cogValues.S
        }
        if(currentPers.label[2] == 'F'){
            T = 100 - cogValues.T
            F = cogValues.T
        }else{
            F = 100 - cogValues.T
            T = cogValues.T
        }
        if(currentPers.label[3] == 'P'){
            J = 100 - cogValues.C
            P = cogValues.C
        }else{
            P = 100 - cogValues.C
            J = cogValues.C
        }
        updateUser(event.target.user.value,event.target.pass.value,E,I,N,S,F,T,P,J,user.NombreUsuario)
    }

    function updateUser(userName,pas,e,i,n,s,f,t,p,j,oldUserName) {
        const pers = personality
        axios.put("/api/UpdateU", {userName,pas,pers,e,i,n,s,f,t,p,j,oldUserName})
        .then(res =>res.data ? setOpen({success: true}): setOpen({error: true}))
    }

    useEffect(()=>{
        axios.get("/api/GetIdu",{withCredentials: true})
        .then((res)=>{
            console.log(res.data[0]);
            setCogValues({P: Math.max(res.data[0].E,res.data[0].I),S: Math.max(res.data[0].S,res.data[0].N),T: Math.max(res.data[0].F,res.data[0].T),C: Math.max(res.data[0].P,res.data[0].J)})
            setUser(res.data[0])
            setCurrentPers(options.find(option => option.value == res.data[0].Personalidad_idPersonalidad))
            console.log(Math.max(res.data[0].E,res.data[0].I)   )
        }).then((res) => {
        })
    },[]);

    
    const handleClose = (e,reason) => {
        setOpen({success: false, error: false});
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    return(
        <div className="general--container">
            <Navbar getData={getData} />
            <section className="login--container" id="profile--container">
                <div className="login--box" id="profile--box" >
                    <div className="login--value">
                        <form onSubmit={handleSubmit}>
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
                            <div className="cognitive-functions-container" style={{display:"flex"}} id="cognitiveF">
                                <p>Porcentajes de tus funciones cognitivas</p>
                                <div className="cognitive-functions">
                                    <div className="letters">
                                        <input type="number" value={cogValues.P} onChange={e=>setCogValues({P: e.target.value,S:cogValues.S,T:cogValues.T,C:cogValues.C})} required />
                                        <label htmlFor="">{currentPers.label.charAt(0)}</label>
                                    </div>
                                    <div className="letters">
                                        <input type="number" value={cogValues.S} onChange={e=>setCogValues({P:cogValues.P,S: e.target.value,T:cogValues.T,C:cogValues.C})} required />
                                        <label htmlFor="">{currentPers.label.charAt(1)}</label>
                                    </div>
                                    <div className="letters">
                                        <input type="number" value={cogValues.T} onChange={e=>setCogValues({P:cogValues.P,S:cogValues.S,T: e.target.value,C:cogValues.C})} required />
                                        <label htmlFor="">{currentPers.label.charAt(2)}</label>
                                    </div>
                                    <div className="letters">
                                        <input type="number" value={cogValues.C} onChange={e=>setCogValues({P:cogValues.P,S:cogValues.S,T:cogValues.T,C: e.target.value})} required />
                                        <label htmlFor="">{currentPers.label.charAt(3)}</label>
                                    </div>
                                </div>
                            </div>
                            <button className="formButton"><Save />Guardar</button>
                            <div className="close--sesion" onClick={()=>{destroyCookie()}}>
                                <p>Cerrar sesion</p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Snackbar open={open.success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center'}}> 
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Usuario registrado con éxito
                </Alert>
            </Snackbar>
            <Snackbar open={open.error} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center'}}> 
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error en el registro de usuario
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    )
}