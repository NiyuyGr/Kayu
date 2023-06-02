import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
    const navigate= useNavigate();
    return (

    <div>
        <div>
        <form>
            <button onClick={() => navigate('./Login')}>Iniciar sesion</button>
        </form>
        </div>
    </div>
  
  )
}

export default Home