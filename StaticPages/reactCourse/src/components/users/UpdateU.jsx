import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
    
function UpdateU() {
    const location = useLocation();
    const userName =location.pathname.split("/")[4];
    const[usuario,setUsuario]=useState({NombreUsuario:'',
                                        PassUsuario:'',
                                        Personalidad_idPersonalidad:''}) 
    const navigate=useNavigate();
    
        
    useEffect( () => {    
            axios.get(`/api/GetId/${userName}`)
            .then((response) => {
                  
                setUsuario(response.data[0]);
                
            }) 
        },[userName]);
        
    function handleSubmit(event){
        event.preventDefault();
        const newname=document.getElementById("name").value
        const newpassword=document.getElementById("password").value
        const newpersonality=document.getElementById("personality").value

        axios.put("/api/UpdateU", {newname,newpassword,newpersonality,userName})
        .then(res => navigate("../OpAdmin/CRUDU"))

        .catch(err => console.log(err));

        }
        console.log(usuario.NombreUsuario);
    return (

    <div >
           
                <div >
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Nombre de Usuario</label>
                        <input type="text"  id="name" defaultValue={usuario.NombreUsuario} />
                    </div>
                    
                    <div>
                        <label htmlFor='password'>Contraseña</label>
                        <input type="text"  id="password" defaultValue={usuario.PassUsuario}/>
                    </div>
                    
                    <div>
                        <label htmlFor='personalidad'>Personalidad</label>
                        <input type="text"  id="personality" defaultValue={usuario.Personalidad_idPersonalidad} />
                    </div>
                    
                    <button>Modificar</button>
                    <button onClick={()=>{navigate('../OpAdmin/CRUDU')}}>Regresar</button>
                </form>
                </div>
    </div>
  
  )
}

export default UpdateU