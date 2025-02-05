import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = ({onLogout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();   //Llama a la funcion onlogout para limpiar el estado del usuario
        navigate("/login");
    };

  return (
    <div className='logoutContainer'>
        <h2>Tem certeza de que deseja sair?</h2>
        <button onClick={handleLogout} className="button">
            Cerrar Sesión
        </button>        
    </div>
  )
}

export default Logout;