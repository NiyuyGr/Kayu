import React,{useState} from "react";
import { Link } from "react-router-dom"
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
import axios from 'axios'
import './css/Login.css'
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Login(){
    const[user,setUser]=useState('');
    const[password,setPassword]=useState('');
    const[open,setOpen]=useState({success: false, error: false});
    const navigate=useNavigate();

    
    function handleSubmit(event){
        event.preventDefault();
        axios.post("/api/Login", {user, password},{withCredentials:true})
        .then(res =>{
            console.log(res);
            if(res.data.Login){
                setOpen({success: true})
            }else{
                setOpen({error:true})
            }
        } 
            )
        .catch(err => console.log(err));
        }

        const handleClose = (e,reason) => {
            open.success ? location.reload() : 
            setOpen({success: false, error: false});
        }

        const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
        })

    return(
        <div className="general--container">
            <Navbar />
            <section className="login--container">
                <div className="login--box">
                    <div className="login--value">
                        <form onSubmit={handleSubmit}>
                            <h2 className="login--title">Log In</h2>
                            <div className="inputbox">
                                <input type="text" onChange={e=>setUser(e.target.value)} required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" onChange={e=>setPassword(e.target.value)} required/>
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <button className="formButton">Conectarse</button>
                            <div className="register">
                                <p>¿Aún no tienes cuenta? <Link to="/Register">¡Regístrate!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Snackbar open={open.success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center'}}> 
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Sesion iniciada con éxito
                </Alert>
            </Snackbar>
            <Snackbar open={open.error} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center'}}> 
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error en inicio de sesión
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    )
}