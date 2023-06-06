import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateP() {
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[latitude,setLatitude]=useState('');
    const[longitude,setLongitude]=useState('');
    const[image,setImage]=useState('');
    const navigate=useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('/api/CreateP',{latitude,longitude,description,name,image})
        .then(res => 
             console.log(res))
        .catch(err => console.log(err));
            navigate('../OpAdmin/CRUDL')
        }

    return (

    <div>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Nombre de Lugar</label>
                <input type="text" placeholder='Ingrese Nombre de Lugar' onChange={e=>setName(e.target.value)}/>
            </div>
            
            <div>
                <label htmlFor='description'>Descripcion</label>
                <input type="text" placeholder='Ingrese Descripcion' onChange={e=>setDescription(e.target.value)}/>
            </div>
            
            <div>
                <label htmlFor='latitude'>Latitud</label>
                <input type="text" placeholder='Ingrese Latitud' onChange={e=>setLatitude(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='longitude'>Longitud</label>
                <input type="text" placeholder='Ingrese Personalidad' onChange={e=>setLongitude(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='image'>Imagen</label>
                <input type="text" placeholder='Ingrese Personalidad' onChange={e=>setImage(e.target.value)}/>
            </div>
            <button>Crear</button>
            <button onClick={()=>{navigate('../OpAdmin/CRUDL')}}>Regresar</button>
        </form>
        </div>
    </div>
  
  )
}

export default CreateP