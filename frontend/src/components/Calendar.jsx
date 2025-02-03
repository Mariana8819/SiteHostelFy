import { useEffect, useState } from "react";
import { getAllReservation } from "../api/reservas";
import { getAllRooms } from "../api/habitaciones";

const MyCalendar = () => {
const [reservas, setReservas] = useState([]);
const [habitaciones, setHabitaciones] = useState([]);
const [currentDate, setCurrentDate] = useState(new Date());
const [dias, setDias] =useState([]);

useEffect(()=>{
    const fetchReservas = async () => {
        try {
            const response = await getAllReservation();
            console.log('mis reservas de la api:', response.data);

            const responseData = response.data;

            if(responseData && Array.isArray(responseData)) {
                const eventos = responseData.map(reserva => {
                    const start = new Date(reserva.fechaCheckIn);
                    const end = new Date(reserva.fechaCheckOut);

                    if( start && end && start <= end) {
                        return {
                            title: `${reserva.huesped.nombre} ${reserva.huesped.apellido} - Habitacion ${reserva.habitacion.numero} (${reserva.estado})`,
                                start: start,
                                end: end,
                                habitacionId: reserva.habitacion._id,
                                reservaId: reserva._id
                        };
                    } else {
                        console.warn('Datas inconsistentes na reserva:', reserva._id);
                        return null;                        
                    }
                }).filter(evento => evento !== null);

                setReservas(eventos);
            } else {
                console.error('Não há dados disponíveis ou a estrutura não é a esperada')
            }

        } catch (error) {
            console.error('Erro ao pesquisar reservas:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await getAllRooms();
            console.log('mis habitaciones de la api:', response)
            setHabitaciones(response.data);
        } catch (error) {
            console.error('Erro ao pesquisar habitaciones:', error);
        }
    };

    fetchReservas();
    fetchRooms();
}, []);

//Generar días del mes actual
useEffect(() => {
    const generateDays = () => {
        const daysArray = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        //Obtener el primer día del mes
        const firstDay = new Date(year, month, 1);
        //Obtener el último día del mes
        const lastDay = new Date(year, month + 1, 0);

        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() +1)) {
            daysArray.push(new Date(day));
        }

        setDias(daysArray);
    };

    generateDays();
}, [currentDate]);

//Navegar al mes anterior
const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() -1);
    setCurrentDate(newDate);
};

//Navegar al Próximo mes
const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
};

//navegar al año anterior
const goToPreviousYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
};

//Navegar al próximo año
const goToNextYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
};

//Filtrar reservas por habitacion y día
const getReservationForRoomAndDay = (habitacionId, dia) => {
    return reservas.filter(reserva => 
        reserva.habitacionId === habitacionId &&
        new Date(reserva.start).toDateString() === dia.toDateString()
    );
};

return (
    <div>
        <div>
            <button onClick={goToPreviousYear}>Ano Anterior</button>
            <button onClick={goToPreviousMonth}>Mês Anterior</button>
            <span>{currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})}</span>
            <button onClick={goToNextMonth}>Próximo Mês</button>      
            <button onClick={goToNextYear}>Próximo Ano</button>      
        </div>
        <table>
            <thead>
                <tr>
                    <th>Quarto</th>
                    {dias.map((dia) => (
                        <th key={dia.toISOString()}>{dia.toLocaleDateString()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {habitaciones.map(habitacion => (
                    <tr key={habitacion._id}>
                        <td>{habitacion.numero}</td>
                        {dias.map((dia)=>(
                            <td key={dia.toISOString()}>
                                {getReservationForRoomAndDay(habitacion._id, dia).map(reserva =>(
                                    <div key={reserva.reservaId}>
                                        {reserva.title}
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
 )

}

export default MyCalendar;



//funciona pero es calendario de dias por horas

// import { useEffect, useState } from "react";
// import { Calendar, momentLocalizer} from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { getAllReservation } from "../api/reservas";

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//     const [reservas, setReservas] = useState([]);

//     useEffect(() => {
//         const fetchReservas = async () => {
//             try {
//                 const response = await getAllReservation();
//                 console.log('aqui mis reservas de la api:', response.data);

//                 const responseData = response.data;

//                 if(responseData && Array.isArray(responseData)) {
//                 const eventos = responseData.map( reserva => {
//                    const start = new Date(reserva.fechaCheckIn);
//                    const end = new Date(reserva.fechaCheckOut);

//                    if(start && end && start <= end) {
//                     return {
//                     title: `${reserva.huesped.nombre} ${reserva.huesped.apellido} - Habitacion ${reserva.habitacion.numero} (${reserva.estado})`,
//                     start: start,
//                     end: end,
//                     allDay: false,
//                     reservaId: reserva._id
//                  };
//                 } else {
//                     console.warn('Datas inconsistentes na reserva:', reserva._id);
//                     return null;                    
//                 }
//             }).filter(evento => evento !== null);     //Elimar los eventos con fechas inconsistentes
            
//                 setReservas(eventos);
//             } else {
//                 console.error('Não há dados disponíveis ou a estrutura não é a esperada');
//             }

//             } catch (error) {
//                 console.error('Erro ao pesquisar reservas:', error);
//             }
//         };

//         fetchReservas();
//     }, []);

//     return (
//         <div>
//         <Calendar 
//         localizer={localizer}
//         events={reservas}
//         startAccessor="start"
//         endAccessor="end"
//         defaultView="week"
//         style={{height: 500}}
//         />
//         </div>
//     );
// };

// export default MyCalendar;
