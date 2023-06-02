import React from 'react'
import { useNavigate } from 'react-router-dom'


function OpAdmin() {
    const navigate= useNavigate();
    return (

    <div>
        <div>
        <form>
        <button onClick={() => navigate('./CRUDU')}>Administrar Usuarios</button>
            <button onClick={() => navigate('./CRUDL')}>Administrar Lugares</button>
        </form>
        </div>
    </div>
  
  )
}

export default OpAdmin