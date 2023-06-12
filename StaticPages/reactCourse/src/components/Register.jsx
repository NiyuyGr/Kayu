import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios";
import Select from 'react-select'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Register.css'


export default function Register(){
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const[currentPers,setCurrentPers]=useState({value:0, label:'ABCD'});
    const[personality,setPersonality]=useState();
    const[isBigger, setIsbigger] = useState(false);
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

    var currPers = "ABCD"

    function handlePersonality(e){
        console.log(e)
        setPersonality(e.value)
        setCurrentPers(e)
        document.getElementById("cognitiveF").style.display = "flex"
        setIsbigger(true)
    }

    const biggerReg = {
        height: '550px',
    }

    const Personality = () => (
        <Select 
            options={options}
            id="test"
            placeholder="Selecciona tu personalidad..."
            onChange={handlePersonality}
            value={currentPers.value!=0 ? currentPers: ''}
            required = {true}
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
        next(E,I,N,S,F,T,P,J)
    }

    function next(E,I,N,S,F,T,P,J){
        axios.post('/api/Register', {name,password,personality,E,I,S,N,F,T,P,J})
        .then((res) => {
            res.data ? setOpen({success: true}): setOpen({error: true})
        })
    }

    const handleClose = (e,reason) => {
        open.success ? navigate('/Login') : 
        setOpen({success: false, error: false});
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    return(
        <div className="general--container">
            <Navbar />
            <section className="register--container">
                <div style={{height: isBigger ? '580px': ''}} className="register--box" id="register--box">
                    <div className="register--value">
                        <form onSubmit={handleSubmit}>
                            <h2 className="register--title">Registro</h2>
                            <div className="inputbox">
                                <input type="text" onChange={e=>setName(e.target.value)} required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" onChange={e=>setPassword(e.target.value)} required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="inputbox">
                                <Personality />
                            </div>
                            <div className="cognitive-functions-container" id="cognitiveF">
                                <p>Porcentajes de tus funciones cognitivas</p>
                                <div className="cognitive-functions">
                                    <div className="letters">
                                        <input type="number" onChange={e=>setCogValues({P: e.target.value,S:cogValues.S,T:cogValues.T,C:cogValues.C})} required />
                                        <label htmlFor="">{currentPers.label.charAt(0)}</label>
                                    </div>
                                    <div className="letters">
                                        <input type="number" onChange={e=>setCogValues({P:cogValues.P,S: e.target.value,T:cogValues.T,C:cogValues.C})} required />
                                        <label htmlFor="">{currentPers.label.charAt(1)}</label>
                                    </div>
                                    <div className="letters">
                                        <input type="number" onChange={e=>setCogValues({P:cogValues.P,S:cogValues.S,T: e.target.value,C:cogValues.C})} required />
                                        <label htmlFor="">{currentPers.label.charAt(2)}</label>
                                    </div>
                                    <div className="letters">
                                        <input type="number" onChange={e=>setCogValues({P:cogValues.P,S:cogValues.S,T:cogValues.T,C: e.target.value})} required />
                                        <label htmlFor="">{currentPers.label.charAt(3)}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="register--personality">
                                <p> ¡Conoce tu personalidad <a href="https://www.16personalities.com/es/test-de-personalidad" target="blank"> aquí!</a></p>
                            </div>
                            <button className="formButton">Registrarse</button>
                            <div className="login">
                                <p>¿Ya tienes una cuenta?<a href="/Login"> ¡Inicia sesión!</a></p>
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