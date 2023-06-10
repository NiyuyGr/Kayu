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
    const[currentPers,setCurrentPers]=useState({value:0, label:'none'});
    const[personality,setPersonality]=useState();
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
        setPersonality(e.value)
        setCurrentPers(e)
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
        axios.post('/api/Register', {name,password,personality})
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
                <div className="register--box">
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