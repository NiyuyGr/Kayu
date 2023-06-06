import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
    
function UpdateP() {
    const location = useLocation();
    const idLugar =location.pathname.split("/")[4];
    const[lugar,setLugar]=useState({Nombre:'',
                                        Descripcion:'',
                                        Latitud:'',
                                        Longitud:'',
                                        Imagenes:''});
    var[newname,setNewname]=useState("");
    var[newdescription,setNewdescription]=useState("");
    var[newlatitude,setNewlatitude]=useState("");
    var[newlongitude,setNewlongitude]=useState("");
    var[newimage,setNewimage]=useState("");
    const navigate=useNavigate();
    
        
    useEffect( () => {    
            axios.get(`/api/GetId/${idLugar}`)
            .then((response) => {
                  
                setLugar(response.data[0]);
                
            }) 
        },[idLugar]);
        
    function handleSubmit(event){
        event.preventDefault();
        if(newlatitude=="") newlatitude=lugar.Latitud
        if(newlongitude=="") newlongitude=lugar.Longitud
        if(newdescription=="") newdescription=lugar.Descripcion
        if(newname=="") newname=lugar.Nombre
        if(newimage=="") newimage=lugar.Imagenes    
        axios.put(`/api/UpdateP/${idLugar}`,{newlatitude,newlongitude,newdescription,newname,newimage})
        .then(res => navigate("../OpAdmin/CRUDL"))

        .catch(err => console.log(err));

        }
        console.log(lugar.idLugar);
    return (

    <div >
                <div >
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Nombre de Usuario</label>
                        <input type="text"  id="name" defaultValue={lugar.Nombre} onChange={e=>setNewname(e.target.value)} />
                    </div>
                    
                    <div>
                        <label htmlFor='Description'>Descripción</label>
                        <input type="text"  id="name" defaultValue={lugar.Descripcion} onChange={e=>setNewdescription(e.target.value)} />
                    </div>
                    
                    <div>
                        <label htmlFor='latitud'>Latitud</label>
                        <input type="text"  id="name" defaultValue={lugar.Latitud} onChange={e=>setNewlatitude(e.target.value)} />
                    </div>
                    
                    <div>
                        <label htmlFor='longitud'>Longitud</label>
                        <input type="text"  id="name" defaultValue={lugar.Longitud} onChange={e=>setNewlongitude(e.target.value)} />
                    </div>
                    
                    <div>
                        <label htmlFor='image'>Imagen</label>
                        <input type="text"  id="name" defaultValue={lugar.Imagenes
                        } onChange={e=>setNewimage(e.target.value)} />
                    </div>
                    

                    
                    <button>Modificar</button>
                    <button onClick={()=>{navigate('../OpAdmin/CRUDL')}}>Regresar</button>
                </form>
                </div>
    </div>
  
  )
}

export default UpdateP