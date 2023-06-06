import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CRUDL(){
      const navigate =useNavigate();
      const[PlaceList,setPlaceList]=useState([]);
    useEffect( () => {
        axios.get('/api/CrudL/')
        .then((response) => {
          setPlaceList(response.data);
          
        })  
  },[PlaceList])
    const deletePlace =(idLugar) => {
        axios.delete(`/api/DeleteL/${idLugar}`)          
    } 
    const viewPlace =(idLugar) => {
        navigate(`./ViewP/${idLugar}`);
        }
    const updatePlace =(idLugar) => {
        navigate(`./UpdateP/${idLugar}`);
        }
    const createPlace =() => {
        navigate('./CreateP');
        }

   
    return(
        <div>
        <h1> Administración de Lugares</h1>
        <button onClick={() => {createPlace()}}>Crear</button>
        
       {PlaceList.map((val)=>{
        return (
                <table key={val.idLugar} border="2">
                        <tbody>
                                
                        <tr>    
                                <td>
                                  {val.idLugar}
                                </td>
                                 <td>
                                 <h3>{val.Nombre}</h3>
                                
                                </td>
                                <td>
                                <h4>{val.Latitud}</h4> 
                                </td>
                                <td>
                                 <h4>{val.Longitud} </h4>
                                </td>
                                <td>    
                                <button onClick={() => {viewPlace(val.idLugar)}}>Ver</button>
                                <button onClick={() => {updatePlace(val.idLugar)}}>Actualizar Datos</button>
                                <button onClick={() => {deletePlace(val.idLugar)}}>Eliminar</button>
                                        
                                        
                                </td>
                        </tr> 
                        
                        </tbody>
               
                </table>
        )
       }

       )}
      
</div>
);
}

export default CRUDL