import React, { useEffect,useState } from "react";
import './CRUDU.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridRowModes } from '@mui/x-data-grid';

function EditToolbar(props) {
        const { setRows, setRowModesModel, filas } = props
        const handleClick = () => { 
                const id = filas.length
                setRows(oldRows => [...oldRows, { NombreUsuario: "", PassUsuario: "", Personalidad_idPersonalidad: "", id, isNew: true }])
                setRowModesModel(oldModel => ({
                        ...oldModel,
                        [id]: { mode: GridRowModes.Edit, fieldToFocus: "NombreUsuario" }
                }))
        }
        return (
                <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                        Add record
                </Button>
                </GridToolbarContainer>
        )
}

function CRUDU(){
        const navigate =useNavigate();
        const [UserList,setUserList]=useState([]);
        const [rows,setRows] = useState([])
        const [rowModesModel, setRowModesModel] = useState({})
        const [oldUserName, setOldUserName] = useState("empty")
        const [filLen, setFilLen] = useState(0)

        const handleRowEditStart = (params, event) => {
                event.defaultMuiPrevented = true
        }
        
        const handleRowEditStop = (params, event) => {
                event.defaultMuiPrevented = true
        }
        
        const handleEditClick = id => () => {
                //console.log("ID: " + id + " User: " + filas.find(a => a.id == id).NombreUsuario)
                setOldUserName(filas.find(a => a.id == id).NombreUsuario)
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
        }
        
        const handleSaveClick = id => () => {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
        }
        
        const handleDeleteClick = id => () => {
                deleteUser(filas.find(a => a.id == id).NombreUsuario)
                setRows(rows.filter(row => row.id !== id))
        }
        
        const handleCancelClick = id => () => {
                setRowModesModel({
                        ...rowModesModel,
                        [id]: { mode: GridRowModes.View, ignoreModifications: true }
                })
                const editedRow = rows.find(row => row.id === id)
                if (editedRow.isNew) {
                        setRows(rows.filter(row => row.id !== id))
                }
        }

        const processRowUpdate = newRow => {
                const updatedRow = { ...newRow, isNew: false }
                updateUser(newRow.NombreUsuario, newRow.PassUsuario, newRow.Personalidad_idPersonalidad)
                setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
                console.log(updatedRow)
                return updatedRow
        }

        const handleRowModesModelChange = newRowModesModel => {
                setRowModesModel(newRowModesModel)
        }

        const columns = [
                {field: "NombreUsuario", 
                headerName: "Nombre",
                width: 180,
                editable: true },
                {field: "PassUsuario",
                width: 180,
                headerName: "Contraseña",
                editable: true },
                {
                field: "Personalidad_idPersonalidad",
                headerName: "Personalidad",
                type: "number",
                width: 180,
                editable: true
                },
                {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 100,
                cellClassName: "actions",
                getActions: ({ id }) => {
                        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
                        if (isInEditMode) {
                                return [
                                        <GridActionsCellItem
                                                icon={<SaveIcon />}
                                                label="Save"
                                                onClick={handleSaveClick(id)}
                                        />,
                                        <GridActionsCellItem
                                                icon={<CancelIcon />}
                                                label="Cancel"
                                                className="textPrimary"
                                                onClick={handleCancelClick(id)}
                                                color="inherit"
                                        />
                                ]
                        }       
                        return [
                                <GridActionsCellItem
                                        icon={<EditIcon />}
                                        label="Edit"
                                        className="textPrimary"
                                        onClick={handleEditClick(id)}
                                        color="inherit"
                                />,
                                <GridActionsCellItem
                                        icon={<DeleteIcon />}
                                        label="Delete"
                                        onClick={handleDeleteClick(id)}
                                        color="inherit"
                                />
                        ]
                }
                }
        ]

        useEffect( () => {
                axios.get('/api/CrudG/')
                .then((response) => {
                setUserList(response.data);
        })  
        },[UserList])
        const deleteUser =(userName) => {
                axios.delete(`/api/DeleteU/${userName}`)          
        }


        const updateUser = (userName,pas,pers) => {
        console.log("Newname " + userName)
        console.log("Oldname " + oldUserName)
        //if(newname=="empty") newname=userName;
        //if(newpassword=="empty")newpassword=pas;
        //if(newpersonality=="") newpersonality=pers;    
        axios.put("/api/UpdateU", {userName,pas,pers,oldUserName})
        .then(res => alert("Usuario modificado"))
                setNewname("empty")
                setNewpassword("empty")
                setNewpersonality("")
        }
        

        const createUser =() => {
                navigate('./CreateU');
        }

        const filas = UserList
        filas.forEach((element,index) => {
                Object.assign(element, {id:index})
        })

        const numFilas = filas.length

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
                <div style={{ height: 300, width: '80%' }}>
                        <DataGrid 
                                editMode="row"
                                rows={filas}
                                columns={columns}
                                rowModesModel={rowModesModel}
                                onRowModesModelChange={handleRowModesModelChange}
                                onRowEditStart={handleRowEditStart}
                                onRowEditStop={handleRowEditStop}
                                processRowUpdate={processRowUpdate}
                                slots={{
                                        toolbar: EditToolbar
                                }}
                                slotProps={{
                                        toolbar: { setRows, setRowModesModel, filas  }
                                }}
                        />
                </div>
        </div>
        );
}

export default CRUDU