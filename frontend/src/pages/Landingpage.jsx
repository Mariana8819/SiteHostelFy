import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landingpage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/login');
    };

  return (
    <div className='landingcontainer'>
        <div className="landingcontent">
            <h1>Bem-vindo ao Hostel Kaizen</h1>
            <p>Descubra a melhor experiência de hospedagem.</p>
            <button onClick={handleStart} className="startbutton">Começar</button>
        </div>
    </div>
  )
}

export default Landingpage;
