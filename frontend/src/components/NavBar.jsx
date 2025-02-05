import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllReservation } from '../api/reservas';
import SearchBar from './SearchBar';
import logo from '../images/logo.png'

const NavBar = ({username, onLogout}) => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await getAllReservation();
                setReservas(response.data);
            } catch (error) {
                console.error('Erro ao obter convidados:', error);
            }
        };

        fetchReservas();
    }, []);

    const handleSearch = (reserva) => {
        console.log('aqui mi reserva seleccionada:', reserva);
        navigate(`/huesped/${reserva.huesped._id}`);
    }

  return (
    <nav className='navbar'>
        {/**Logo */}
        <div className='logo'>
            <img src={logo} alt="Logo" className='logoImage' />
            <span className='logoText'>HostelFy</span>
        </div>

        {/**Menu */}
        <div className="menu">
            <Link to="/home" className='menuItem'>Inicio</Link>
            <Link to="/calendar" className='menuItem'>Mapa</Link>
            <Link to="/reservas" className='menuItem'>Reservas</Link>
            <Link to="/habitaciones" className='menuItem'>Habitaciones</Link>
            <Link to="/contacto" className='menuItem'>Contacto</Link>
        </div>

        <SearchBar onSearch={handleSearch} reservas={reservas}/>

        {/**Usuario y Logout */}
        <div className="userSection">
            <span className="username">{username}</span>
            <Link to="/logout" className="button" onClick={onLogout} style={{background:'#ff4d4d'}}>Cerrar Sesión</Link>
        </div>
    </nav>
  )
}

export default NavBar
