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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Navbar from "./Navbar";

function EditToolbar(props) {
        const { setRows, setRowModesModel, rowsLen}  = props
        
        const handleClick = () => { 
                const id = rowsLen
                setRows(oldRow => [...oldRow, { NombreUsuario: "", PassUsuario: "", Personalidad_idPersonalidad: "",E: "",I: "",S: "",N: "",F: "",T: "",P: "",J: "", id, isNew: true }])
                setRowModesModel(oldModel => ({
                        ...oldModel,
                        [id]: { mode: GridRowModes.Edit, fieldToFocus: "NombreUsuario" }
                }))
        }
        return (
                <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                        Añadir usuario
                </Button>
                </GridToolbarContainer>
        )
}

function CRUDU(){
        const navigate =useNavigate();
        const [rows,setRows] = useState([])
        const [rowModesModel, setRowModesModel] = useState({})
        const [oldUserName, setOldUserName] = useState("empty")
        const[open,setOpen]=useState({isOpen: false, type:'success', message:'none'});
        

        function handleSubmit(name, password, personality,e,i,s,n,f,t,p,j){
                console.log("nom : " +  name +  "pass : " + password + "per : " + personality+"e :"+e+"i :"+i+"s :"+s+"n :"+n+"f :"+f+"t :"+t+"p :"+p+"j :"+j)
                axios.post('/api/CreateU', {name,password,personality,e,i,s,n,f,t,p,j})
                .then(res => {
                        res.data ? setOpen({isOpen: true, type:'success', message:'Usuario creado con éxito'}) : setOpen({isOpen: true,type:'error', message:'Error en la creación de usuario'})
                })
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
                        handleSubmit(newRow.NombreUsuario, newRow.PassUsuario, newRow.Personalidad_idPersonalidad, newRow.E, newRow.I, newRow.S, newRow.N, newRow.F, newRow.T, newRow.P, newRow.J)
                } else{
                        updateUser(newRow.NombreUsuario, newRow.PassUsuario, newRow.Personalidad_idPersonalidad, newRow.E, newRow.I, newRow.S, newRow.N, newRow.F, newRow.T, newRow.P, newRow.J)
                }
                const updatedRow = { ...newRow, isNew: false }
                setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
                return updatedRow
        }

        const handleRowModesModelChange = newRowModesModel => {
                setRowModesModel(newRowModesModel)
        }

        const columns = [
                {field: "NombreUsuario", 
                headerName: "Nombre",
                flex: 1,
                editable: true },
                {field: "PassUsuario",
                flex: 1,
                headerName: "Contraseña",
                editable: true },
                {
                field: "Personalidad_idPersonalidad",
                flex: 1,
                headerName: "Personalidad",
                type: "number",
                editable: true
                },
                {
                field: "E",
                flex: 1,
                headerName: "E",
                type: "number",
                editable: true
                },
                {
                field: "I",
                flex: 1,
                headerName: "I",
                type: "number",
                editable: true
                },
                {
                field: "S",
                flex: 1,
                headerName: "S",
                type: "number",
                editable: true
                },
                {
                field: "N",
                flex: 1,
                headerName: "N",
                type: "number",
                editable: true
                },
                {
                field: "F",
                flex: 1,
                headerName: "F",
                type: "number",
                editable: true
                },
                {
                field: "T",
                flex: 1,
                headerName: "T",
                type: "number",
                editable: true
                },
                {
                field: "P",
                flex: 1,
                headerName: "P",
                type: "number",
                editable: true
                },
                {
                field: "J",
                flex: 1,
                headerName: "J",
                type: "number",
                editable: true
                },
                {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                flex: 1,
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
                .then(res =>{
                        res.data ? setOpen({isOpen: true, type:'success', message:'Usuario eliminado con éxito'}) : setOpen({isOpen: true,type:'error', message:'No se ha logrado eliminar el usuario'})
                })
        }


        const updateUser = (userName,pas,pers,e,i,s,n,f,t,p,j) => {
        console.log("Newname " + userName)
        console.log("Oldname " + oldUserName)
        //if(newname=="empty") newname=userName;
        //if(newpassword=="empty")newpassword=pas;
        //if(newpersonality=="") newpersonality=pers;    
        axios.put("/api/UpdateU", {userName,pas,pers,e,i,s,n,f,t,p,j,oldUserName})
        .then(res => {
                res.data ? setOpen({isOpen: true, type:'success', message:'Usuario modificado con exito'}) : setOpen({isOpen: true,type:'error', message:'Error en la modificación del usuario'})
        })
        }

        const handleClose = (e,reason) => {
                open.success ? navigate('/Login') : null
                setOpen({isOpen: false, type: 'success'});
        }
        
        const Alert = React.forwardRef(function Alert(props, ref) {
                return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
        })

        const rowsLen = rows.length

return(
        <div className="general--container">
                <Navbar />
                <div className="crudU">
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
                <Snackbar open={open.isOpen} autoHideDuration={5000} onClose={handleClose}> 
                        <Alert onClose={handleClose} severity={open.type} sx={{ width: '100%' }}>
                                {open.message}
                        </Alert>
                </Snackbar>
        </div>
        );
}

export default CRUDU