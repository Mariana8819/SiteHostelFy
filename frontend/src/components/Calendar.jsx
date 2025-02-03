import { useEffect, useState } from "react";
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllReservation } from "../api/reservas";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await getAllReservation();
                console.log('aqui mis reservas de la api:', response.data);

                const responseData = response.data;

                if(responseData && Array.isArray(responseData)) {
                const eventos = responseData.map( reserva => {
                   const start = new Date(reserva.fechaCheckIn);
                   const end = new Date(reserva.fechaCheckOut);

                   if(start && end && start <= end) {
                    return {
                    title: `${reserva.huesped.nombre} ${reserva.huesped.apellido} - Habitacion ${reserva.habitacion.numero} (${reserva.estado})`,
                    start: start,
                    end: end,
                    allDay: false,
                    reservaId: reserva._id
                 };
                } else {
                    console.warn('Datas inconsistentes na reserva:', reserva._id);
                    return null;                    
                }
            }).filter(evento => evento !== null);     //Elimar los eventos con fechas inconsistentes
            
                setReservas(eventos);
            } else {
                console.error('Não há dados disponíveis ou a estrutura não é a esperada');
            }

            } catch (error) {
                console.error('Erro ao pesquisar reservas:', error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <div>
        <Calendar 
        localizer={localizer}
        events={reservas}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        style={{height: 500}}
        />
        </div>
    );
};

export default MyCalendar;