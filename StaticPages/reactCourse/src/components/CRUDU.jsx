import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CRUDU(){
      const navigate =useNavigate();
      const[UserList,setUserList]=useState([]);
      var[newname,setNewname]=useState("empty");
      var[newpassword,setNewpassword]=useState("empty");
      var[newpersonality,setNewpersonality]=useState("");

        useEffect( () => {
              axios.get('/api/CrudG/')
              .then((response) => {
                setUserList(response.data);
              })  
        },[UserList,newname,newpassword,newpersonality])
       
        const deleteUser =(userName) => {
                axios.delete(`/api/DeleteU/${userName}`)          
        } 

        const updateUser = (userName,pas,pers) => {
         if(newname=="empty") newname=userName;
         if(newpassword=="empty")newpassword=pas;
         if(newpersonality=="") newpersonality=pers;     
        axios.put("/api/UpdateU", {newname,newpassword,newpersonality,userName})
        .then(res => alert("Usuario modificado"))
                setNewname("empty")
                setNewpassword("empty")
                setNewpersonality("")
        }
        

        const createUser =() => {
                navigate('./CreateU');
        }

        

    return(
       
       <div>
                <h1> Administración de Usuarios</h1>
                <button onClick={() => {createUser()}}>Crear</button>
               {UserList.map((val)=>{
                return (
                        <div key={val.NombreUsuario}>
                                <table>
                                        <tbody>
                                <tr>    
                                <td>
                                        <input type="text"  defaultValue={val.NombreUsuario}  onChange={e=>
                                        setNewname(e.target.value)
                                        }/>   
                                        </td>
                                         <td>
                                        <input type="text"  defaultValue={val.PassUsuario} onChange={e=>{
                                        setNewpassword(e.target.value)
                                        }}/>   
                                        
                                        
                                        </td>
                                        <td>
                                        <input type="text"  defaultValue={val.Personalidad_idPersonalidad } onChange={e=>
                                        setNewpersonality(e.target.value)} />   
                                        </td>
                                        <td>    
                                        
                                        <button onClick={() => {

                                                 updateUser(val.NombreUsuario,val.PassUsuario,val.Personalidad_idPersonalidad) 
                                                
                                                }}>Actualizar Datos</button>
                                        <button onClick={() => {deleteUser(val.NombreUsuario)}}>Eliminar</button>
                                                
                                                
                                        </td>
                                </tr> 
                                </tbody>
                                </table>
                       
                        </div>
                )
               }

               )}
        </div>
        );
}

export default CRUDU