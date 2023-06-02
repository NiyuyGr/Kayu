import React, { useState } from 'react'
import axios from 'axios'

function Signin() {
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const[personality,setPersonality]=useState('');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3030/Signin', {name,password,personality})
        .then(res => console.log(res))
        .catch(err => console.log(err));

        }

    return (

    <div>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Nombre de Usuario</label>
                <input type="text" placeholder='Ingrese Nombre de usuario' onChange={e=>setName(e.target.value)}/>
            </div>
            
            <div>
                <label htmlFor='password'>Contraseña</label>
                <input type="password" placeholder='Ingrese contraseña' onChange={e=>setPassword(e.target.value)}/>
            </div>
            
            <div>
                <label htmlFor='personalidad'>Personalidad</label>
                <input type="text" placeholder='Ingrese Personalidad' onChange={e=>setPersonality(e.target.value)}/>
            </div>
            
            <button>Registrar</button>

        </form>
        </div>
    </div>
  
  )
}

export default Signin