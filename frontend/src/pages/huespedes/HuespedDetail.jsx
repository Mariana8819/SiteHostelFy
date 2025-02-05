import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllReservation } from '../../api/reservas';

const HuespedDetail = () => {
    const {huespedId} = useParams();     //Obtiene el ID del huesped desde la URL
    const [reservas, setReservas] = useState([]);
    const [huesped, setHuesped] = useState(null);

    useEffect(() => {
        const fetchReservas = async()=>{
            try {
                const response = await getAllReservation();
                const reservasHuesped = response.data.filter(
                    (reserva) => reserva.huesped._id === huespedId
                );
                setReservas(reservasHuesped);
                if(reservasHuesped.length > 0) {
                    setHuesped(reservasHuesped[0].huesped);     //aqui obtiene los datos del huesped
                }
            } catch (error) {
                console.error('Erro ao obter reservas:', error);
            }
        };

        fetchReservas();
    }, [huespedId]);

    if (!huesped) {
        return <div>Carregando...</div>
    }

  return (
    <div className='huesped-detail-container'>
        <h1>Detalhes do hóspede</h1>   
        <div className="huesped-info">
            <h2>{huesped.nombre} {huesped.apellido}</h2>
            <p><strong>DNI:</strong>{huesped.dni}</p>
            <p><strong>Telefono:</strong>{huesped.telefono}</p>
            <p><strong>Domicilio:</strong>{huesped.domicilio}</p>
            <p><strong>Email:</strong>{huesped.email}</p>
        </div>

        <h2>Reservas</h2>
        {reservas.length > 0 ? (
            <ul className='reservas-list'>
                {reservas.map((reserva) => (
                    <li key={reserva._id} className='reserva-item'>
                        <p><strong>Quarto:</strong>{reserva.habitacion.numero} ({reserva.habitacion.tipo}) </p>
                        <p><strong>Chek-In:</strong>{new Date(reserva.fechaCheckIn).toLocaleDateString()}</p>
                        <p><strong>Chek-Out:</strong>{new Date(reserva.fechaCheckOut).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${reserva.total}</p>
                        <p><strong>Estado:</strong>{reserva.estado}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No hay reservas para este huesped.</p>
        )}
    </div>
  )
}

export default HuespedDetail;
