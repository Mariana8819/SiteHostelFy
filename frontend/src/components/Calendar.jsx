import React, { useEffect, useState } from "react";
import { getAllReservation } from "../api/reservas";
import { getAllRooms } from "../api/habitaciones";
import FormReservation from "./FormReservation";

const Calendar = () => {
const [reservas, setReservas] = useState([]);
const [habitaciones, setHabitaciones] = useState([]);
const [currentDate, setCurrentDate] = useState(new Date());
const [dias, setDias] =useState([]);
const [selectedCama, setSelectedCama] = useState(null);
const [selectedDia, setSelectedDia] = useState(null);

// useEffect(()=>{
//     const fetchReservas = async () => {
//         try {
//             const response = await getAllReservation();
//             console.log('mis reservas de la api:', response.data);

//             const responseData = response.data;

//             if(responseData && Array.isArray(responseData)) {
//                 const eventos = responseData.map(reserva => {
//                     const start = new Date(reserva.fechaCheckIn);
//                     const end = new Date(reserva.fechaCheckOut);

//                     if( start && end && start <= end) {
//                         return {
//                             title: `${reserva.huesped.nombre} ${reserva.huesped.apellido} - Habitacion ${reserva.habitacion.numero} (${reserva.estado})`,
//                                 start: start,
//                                 end: end,
//                                 habitacionId: reserva.habitacion._id,
//                                 reservaId: reserva._id
//                         };
//                     } else {
//                         console.warn('Datas inconsistentes na reserva:', reserva._id);
//                         return null;                        
//                     }
//                 }).filter(evento => evento !== null);

//                 setReservas(eventos);
//             } else {
//                 console.error('Não há dados disponíveis ou a estrutura não é a esperada')
//             }

//         } catch (error) {
//             console.error('Erro ao pesquisar reservas:', error);
//         }
//     };

//     const fetchRooms = async () => {
//         try {
//             const response = await getAllRooms();
//             console.log('mis habitaciones de la api:', response)
//             setHabitaciones(response.data);
//         } catch (error) {
//             console.error('Erro ao pesquisar habitaciones:', error);
//         }
//     };

//     fetchReservas();
//     fetchRooms();
// }, []);

useEffect(() => {
    const fetchReservas = async () => {
        try {
            const response = await getAllReservation();
            setReservas(response.data);
        } catch (error) {
            console.error('Erro ao pesquisar reservas:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await getAllRooms();
            setHabitaciones(response.data);
        } catch (error) {
            console.error('Erro ao pesquisar quartos:', error);
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

        //Obtener el primer día del mes y Obtener el último día del mes
        const firstDay = new Date(year, month, 1);        
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

//Filtrar reservas por cama de habitacion y 
const getReservationForBedAndDay = (camaId, dia) => {
    return reservas.filter(
        (reserva) => 
            reserva.cama === camaId && 
            new Date(reserva.fechaCheckIn).toDateString() === dia.toDateString()
    );
};

const handleCamaClick = (cama, dia) => {
    setSelectedCama(cama);
    setSelectedDia(dia);
}


// //Filtrar reservas por habitacion y día
// const getReservationForRoomAndDay = (habitacionId, dia) => {
//     return reservas.filter(reserva => 
//         reserva.habitacionId === habitacionId &&
//         new Date(reserva.start).toDateString() === dia.toDateString()
//     );
// };

return (
    <div className="container">
        <div>
            <button className="button" onClick={goToPreviousYear}>Ano Anterior</button>
            <button className="button" onClick={goToPreviousMonth}>Mês Anterior</button>
            <span>{currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})}</span>
            <button className="button" onClick={goToNextMonth}>Próximo Mês</button>      
            <button className="button" onClick={goToNextYear}>Próximo Ano</button>      
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>Quarto</th>
                    {dias.map((dia) => (
                        <th key={dia.toISOString()}>{dia.toLocaleDateString()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {habitaciones.map((habitacion) => (
                    <React.Fragment key={habitacion._id}>
                        <tr>
                            <td rowSpan={habitacion.camas.length + 1}>
                                <strong>{habitacion.numero} - {habitacion.tipo}</strong>
                            </td>
                        </tr>
                        {habitacion.camas.map((cama) => (
                            <tr key={cama._id}>
                                <td>Cama {cama.numero} ({cama.tipo})</td>
                                {dias.map((dia) => (
                                    <td 
                                    key={dia.toISOString()}
                                    onClick={() => handleCamaClick(cama, dia)}
                                    >
                                        {getReservationForBedAndDay(cama._id, dia).map((reserva) => (
                                            <div
                                            key={reserva._id}
                                            className={`reserva ${reserva.estado}`}
                                            onClick={() => handleCamaClick(cama)}
                                            >
                                                {reserva.huesped.nombre} {reserva.huesped.apellido}
                                            </div>
                                        ))}                                        
                                    </td>
                               ))}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}            
            </tbody>
        </table>

        {selectedCama && selectedDia &&(
             <FormReservation cama={selectedCama} dia={selectedDia}/>
            )}
    </div>
 );
};

export default Calendar; 




            {/* <tbody>
                {habitaciones.map(habitacion => (
                    <tr key={habitacion._id}>
                        <td>{habitacion.numero} {habitacion.tipo}</td>
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

export default MyCalendar; */}



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
