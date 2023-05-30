import React, { useState } from 'react'
import axios from 'axios'
function Login() {
    const[user,setUser]=useState('');
    const[password,setPassword]=useState('');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3030/Login', {user, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));

        }

    return (

    <div>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='user'>Usuario</label>
                <input type="text" placeholder='Ingrese usuario' onChange={e=>setUser(e.target.value)}/>
            </div>

            <div>
                <label htmlFor='password'>Contraseña</label>
                <input type="password" placeholder='Ingrese contraseña' onChange={e=>setPassword(e.target.value)}/>
            </div>
            
            <button>Iniciar sesion</button>

        </form>
        </div>
    </div>
  
  )
}

export default Login