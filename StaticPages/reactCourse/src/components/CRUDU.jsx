import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CRUDU(){
      const navigate =useNavigate();
      const[UserList,setUserList]=useState([]);

        useEffect( () => {
              axios.get('/api/CrudG/')
              .then((response) => {
                setUserList(response.data);
              })  
        },[])
       
        const deleteUser =(userName) => {
                axios.delete(`/api/DeleteU/${userName}`)
                
                       window.location.reload(false);
        } 
        const updateUser = (userName) => {
                navigate(`./UpdateU/${userName}`);
        }

        const createUser =() => {
                navigate('./CreateU');
        }

        const viewUser =(userName) => {
                navigate(`./ViewU/${userName}`);
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
                                          {val.NombreUsuario}      
                                        </td>
                                        <td>    
                                        <button onClick={() => {viewUser(val.NombreUsuario)}}>Ver</button>
                                        <button onClick={() => {updateUser(val.NombreUsuario)}}>Actualizar Datos</button>

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