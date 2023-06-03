import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
    
function ViewU() {
    const location = useLocation();
    const userName =location.pathname.split("/")[4];
    const[usuario,setUsuario]=useState({NombreUsuario:'',
                                        PassUsuario:'',
                                        Personalidad_idPersonalidad:''}) 
    const navigate=useNavigate();
    
        
    useEffect( () => {    
            axios.get(`http://localhost:3030/GetId/${userName}`)
            .then((response) => {
                  
                setUsuario(response.data[0]);
                
            }) 
        },[userName]);
        
    return (

    <div >
           
                <div >
                    <div>
                        
                        <h1>  Nombre:{usuario.NombreUsuario}</h1>
                    </div>
                    
                    <div>
                    
                        <h1> Contraseña: {usuario.PassUsuario}</h1>
                    </div>
                    
                    <div>
                    
                        <h1>Personalidad: {usuario.Personalidad_idPersonalidad}</h1>
                    </div>
                    
                    <button onClick={()=>{navigate('../OpAdmin/CRUDU')}}>Regresar</button>
        
                
                </div>
    </div>
  
  )
}

export default ViewU