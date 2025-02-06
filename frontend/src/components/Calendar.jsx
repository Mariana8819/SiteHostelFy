import React, { useEffect, useState } from "react";
import { getAllReservation } from "../api/reservas";
import { getAllRooms } from "../api/habitaciones";
import FormReservation from "./FormReservation";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
const [reservas, setReservas] = useState([]);
const [habitaciones, setHabitaciones] = useState([]);
const [currentDate, setCurrentDate] = useState(new Date());
const [dias, setDias] =useState([]);
const [selectedCama, setSelectedCama] = useState(null);
const [selectedDia, setSelectedDia] = useState(null);

const navigate = useNavigate();

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

//Generar las fechas de la semana actual
useEffect(() => {
    const generateDays = () => {
        const daysArray = [];
        const today = new Date(currentDate);
        const firstDayOfWeek = today.getDate() - today.getDay() + 1;
        today.setDate(firstDayOfWeek);

        //Genera los días de la semana actual(lun a dom)
        for (let i = 0; i < 7; i++) {
           daysArray.push(new Date(today));
           today.setDate(today.getDate() +1);
        }

        setDias(daysArray);
    };

    generateDays();
}, [currentDate]);

//Navegar a la semana anterior
const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
};

const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
};

// //navegar al año anterior
// const goToPreviousYear = () => {
//     const newDate = new Date(currentDate);
//     newDate.setFullYear(newDate.getFullYear() - 1);
//     setCurrentDate(newDate);
// };

// //Navegar al próximo año
// const goToNextYear = () => {
//     const newDate = new Date(currentDate);
//     newDate.setFullYear(newDate.getFullYear() + 1);
//     setCurrentDate(newDate);
// };

// Función para normalizar fechas (eliminar horas, minutos, segundos y zona horaria)
const normalizeDate = (date) => {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0); // Establece la hora a medianoche
    return newDate;
};

//Filtrar reservas por cama de habitacion y 
const getReservationForBedAndDay = (camaId, dia) => {
    const normalizedDia = normalizeDate(dia);  
    return reservas.filter(
        (reserva) => 
            reserva.camas.some(cama => cama._id === camaId ) && 
            normalizeDate(new Date(reserva.fechaCheckIn)).getTime() <= normalizedDia.getTime() &&
            normalizeDate(new Date(reserva.fechaCheckOut)).getTime() > normalizedDia.getTime()
    );
};

const handleCamaClick = (cama, dia) => {
    setSelectedCama(cama);
    setSelectedDia(dia);
    navigate('/formreservation', {state:{ cama, dia}});
};

const updateReservas = async () => {
    try {
        const response = await getAllReservation();
        setReservas(response.data);
    } catch (error) {
        console.error('Erro ao pesquisar reservas:', error);
    }
};

return (
    <div className="container">
        <div>
            <button className="button" onClick={goToPreviousWeek}>Semana Anterior</button>
            <span>{dias.length > 0
            ? `Semana de ${dias[0].toLocaleDateString()} a ${dias[6].toLocaleDateString()}`
            : 'Cargando semana...' }</span>
            <button className="button" onClick={goToNextWeek}>Próxima Semana</button>                      
        </div>

        <div 
        // style={{ overflowY: 'auto', maxHeight:'80vh'}}
        >
        <table className="table">
            <thead>
                <tr>
                    <th>Quarto</th>
                    <th>Cama</th>
                    {dias.map((dia) => (
                        <th 
                        key={dia.toISOString()}
                        style={{position:'sticky', top: 0, background:'white', zIndex: 1}}
                        >
                            {dia.toLocaleDateString('pt-PT', {weekday: 'long', year: 'numeric', month: 'numeric', day:'numeric'})}
                            </th>
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
                                <td>{`Cama ${cama.numero} (${cama.tipo})`}</td>
                                {dias.map((dia) => (
                                    <td 
                                    key={dia.toISOString()}
                                    onClick={() => handleCamaClick(cama, dia)}
                                    >
                                        {getReservationForBedAndDay(cama._id, dia).map((reserva) => (
                                            <div
                                            key={reserva._id}
                                            className={`reserva ${reserva.estado}`}
                                            onClick={() => handleCamaClick(cama,dia)}
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
        </div>

        {selectedCama && selectedDia &&(
             <FormReservation 
             cama={selectedCama} 
             dia={selectedDia}
             onReservaCreada={updateReservas}
             setSelectedCama={setSelectedCama}
             setSelectedDia={setSelectedDia}
             />
            )}
    </div>
 );
};

export default Calendar; 