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
import Navbar from "./Navbar";

function EditToolbar(props) {
        const { setRows, setRowModesModel, rowsLen}  = props
        const handleClick = () => { 
                const id = rowsLen
                setRows(oldRow => [...oldRow, { NombreUsuario: "", PassUsuario: "", Personalidad_idPersonalidad: "", id, isNew: true }])
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
        const [rows,setRows] = useState([])
        const [rowModesModel, setRowModesModel] = useState({})
        const [oldUserName, setOldUserName] = useState("empty")
        const [create, setCreate] = useState(false)

        function handleSubmit(name, password, personality){
                console.log("nom : " +  name +  "pass : " + password + "per : " + personality)
                axios.post('/api/CreateU', {name,password,personality})
                .then(res => 
                        console.log(res))
                .catch(err => console.log(err));
                        navigate('../OpAdmin/CRUDU')
                }

        const handleRowEditStart = (params, event) => {
                event.defaultMuiPrevented = true
        }
        
        const handleRowEditStop = (params, event) => {
                event.defaultMuiPrevented = true
        }
        
        const handleEditClick = id => () => {
                //console.log("ID: " + id + " User: " + filas.find(a => a.id == id).NombreUsuario)
                setOldUserName(rows.find(a => a.id == id).NombreUsuario)
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
        }
        
        const handleSaveClick = id => () => {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })

        }
        
        const handleDeleteClick = id => () => {
                deleteUser(rows.find(a => a.id == id).NombreUsuario)
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
                if (newRow.isNew) {
                        handleSubmit(newRow.NombreUsuario, newRow.PassUsuario, newRow.Personalidad_idPersonalidad)
                }
                const updatedRow = { ...newRow, isNew: false }
                updateUser(newRow.NombreUsuario, newRow.PassUsuario, newRow.Personalidad_idPersonalidad)
                setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
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

        var filas

        useEffect( () => {
                axios.get('/api/CrudG/')
                .then((response) => {
                        filas = response.data
                        filas.forEach((e,idx) => {
                                Object.assign(e, {id: idx})
                        })
                        setRows(filas)
        })
        },[])
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
        }
        
        function handleSubmit(name, password, personality){
        axios.post('/api/CreateU', {name,password,personality})
        .then(res => 
             console.log(res))
        .catch(err => console.log(err));
            navigate('../OpAdmin/CRUDU')
        }

        const createUser =() => {
                navigate('./CreateU');
        }

        const rowsLen = rows.length

return(
        <div className="general--container">
                <Navbar />
                <div className="crud">
                        <div className="crud--datGrid">
                                <DataGrid 
                                        editMode="row"
                                        rows={rows}
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
                                                toolbar: { setRows, setRowModesModel, rowsLen}
                                        }}
                                />
                        </div>
                </div>
        </div>
        );
}

export default CRUDU