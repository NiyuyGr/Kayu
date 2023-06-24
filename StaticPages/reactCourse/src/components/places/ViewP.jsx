import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
    
function ViewP() {
    const location = useLocation();
    const idLugar =location.pathname.split("/")[4];
    const[lugar,setLugar]=useState({Latitud:'',
                                        Longitud:'',
                                        Descripcion:'',
                                        Nombre:'',
                                        Imagenes:'',
                                        categorias_idCategorias:''}) 
    const navigate=useNavigate();
    
        
    useEffect( () => {    
            axios.get(`/api/GetId/${idLugar}`)
            .then((response) => {
                  
                setLugar(response.data[0]);
                
            }) 
        },[idLugar]);
        
    return (

    <div >
           
                <div >
                    <div>
                        <h1>  Nombre:{lugar.Nombre}</h1>
                    </div>
                    
                    <div>
                    
                        <h1> Descripcion: {lugar.Descripcion}</h1>
                    </div>
                    
                    <div>
                    
                        <h1>Latitud: {lugar.Latitud}</h1>
                    </div>
                    <div>
                    
                        <h1>Longitud: {lugar.Longitud}</h1>
                    </div>
                    <div>
                    
                        <h1>Categoria: {lugar.categorias_idCategorias}</h1>
                    </div>
                    <div>
                    
                        <img src={lugar.Imagenes}/> 
                    </div>
                    
                    <button onClick={()=>{navigate('../OpAdmin/CRUDL')}}>Regresar</button>
        
                
                </div>
    </div>
  
  )
}

export default ViewP