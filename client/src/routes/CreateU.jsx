import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateU() {
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const[personality,setPersonality]=useState('');
    const navigate=useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3030/CreateU', {name,password,personality})
        .then(res => 
             console.log(res))
        .catch(err => console.log(err));
            navigate('../OpAdmin/CRUDU')
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
            
            <button>Crear</button>
            <button onClick={()=>{navigate('../OpAdmin/CRUDU')}}>Regresar</button>
        </form>
        </div>
    </div>
  
  )
}

export default CreateU