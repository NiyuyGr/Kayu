import React, { useEffect, useState } from "react";
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
  const { setRows, setRowModesModel, lastRow}  = props
  
  const handleClick = () => { 
          const id = lastRow+1
          console.log("ID",lastRow);
          setRows(oldRow => [{id, Nombre: "",Descripcion: "", Latitud: "",Longitud: "",Imagenes: "",categorias_idCategorias: "", isNew: true }, ...oldRow])
          setRowModesModel(oldModel => ({
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "Nombre" },
            ...oldModel
          }))
  }
  return (
          <GridToolbarContainer>
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                  Añadir lugar
          </Button>
          </GridToolbarContainer>
  )
}

function CRUDL(){
  const navigate =useNavigate();
  const[PlaceList,setPlaceList]=useState([]);
  const [rows,setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [lastRow,setLastRow] = useState(0)
  const[open,setOpen]=useState({isOpen: false, type:'success', message:'none'});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true
}

const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true
}

const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
}

const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
}

const handleDeleteClick = id => () => {
    deletePlace(id)
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
            handleSubmit(newRow.Nombre,newRow.Latitud,newRow.Longitud,newRow.Descripcion,newRow.Imagenes,newRow.categorias_idCategorias)
    } else{
            updatePlace(newRow.id, newRow.Latitud, newRow.Longitud, newRow.Descripcion, newRow.Nombre, newRow.Imagenes, newRow.categorias_idCategorias)
    }
    
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
}

const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
}

const columns = [
    {field: "id", 
    headerName: "ID",
    flex: 0.2,
    editable: false},
    {field: "Nombre",
    flex: 1,
    headerName: "Nombre",
    editable: true },
    {field: "Descripcion",
    flex: 2.8,
    headerName: "Descripción",
    editable: true },
    {field: "Latitud",
    flex: 0.5,
    headerName: "Latitud",
    editable: true
    },
    {field: "Longitud",
    flex: 0.5,
    headerName: "Longitud",
    editable: true
    },
    {field: "Imagenes",
    flex: 1,
    headerName: "Imagen",
    editable: true
    },
    {field: "categorias_idCategorias",
    flex: 0.5,
    headerName: "Categoria",
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
      axios.get('/api/CrudL/')
      .then((response) => {
        filas = response.data
        filas.map((fila)=>{
          fila.id = fila.idLugar
          delete fila.idLugar
        })
        console.log("Max",Math.max(...filas.map(o => o.id)))
        setLastRow(Math.max(...filas.map(o => o.id)))
        setRows(filas)
        setPlaceList(response.data)
      })  
  },[])

  const deletePlace =(idLugar) => {
    axios.delete(`/api/DeleteL/${idLugar}`).then(res =>{
      res.data ? setOpen({isOpen: true, type:'success', message:'Usuario eliminado con éxito'}) : setOpen({isOpen: true,type:'error', message:'No se ha logrado eliminar el usuario'})
    })         
  }

  const updatePlace =(idLugar,newlatitude,newlongitude,newdescription,newname,newimage,newcategory) => {
    axios.put(`/api/UpdateP/${idLugar}`,{newlatitude,newlongitude,newdescription,newname,newimage,newcategory})
        .then(res => res.data ? setOpen({isOpen: true, type:'success', message:'Usuario modificado con exito'}) : setOpen({isOpen: true,type:'error', message:'Error en la modificación del usuario'}))
  }

  function handleSubmit(name,latitude,longitude,description,image,category){
    axios.post('/api/CreateP',{latitude,longitude,description,name,image,category})
        .then(res => {
          res.data ? setOpen({isOpen: true, type:'success', message:'Lugar creado con éxito'}) : setOpen({isOpen: true,type:'error', message:'Error en la creación de lugar'})
        })
        .catch(err => console.log(err));
  }
  
  const handleClose = (e,reason) => {
    open.success ? navigate('/Login') : null
    setOpen({isOpen: false, type: 'success'});
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

  return(
      <div>
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
                                                toolbar: { setRows, setRowModesModel,lastRow}
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

export default CRUDL