import { useEffect, useState } from "react";
import { getAllReservation } from "../api/reservas";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement, Title, Tooltip, Legend } from "chart.js";

//registro de los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [reservas, setReservas] = useState([]);
    const [reservationForMonth, setReservationForMonth] = useState({});

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await getAllReservation();
                setReservas(response.data);
            } catch (error) {
                console.error('Erro ao pesquisar reservas:', error);
            }
        };

        fetchReservation();
    }, []);

    //Agrupar reservas por mes y año
    const getReservationForMonth = () => {
        const groupedReservations = {};

    reservas.forEach(reserva => {
        const dataDay = new Date(reserva.fechaCheckIn);
        const datamonth = dataDay.toLocaleString('default', {month: 'long' });
        const datayear = dataDay.getFullYear();

        const clave = `${datamonth} ${datayear}`;

        if(!groupedReservations[clave]) {
            groupedReservations[clave] = 0;
        }

        groupedReservations[clave]++;
    });

    return groupedReservations;
};

//Actualizar reservationForMonth cuando las reservas cambien
useEffect(() => {
    if(reservas.length > 0) {
        const groupedReservations = getReservationForMonth();
        setReservationForMonth(groupedReservations);
    }
}, [reservas]);

//Preparar los datos para el gráfico de líneas
const chartData = {
    labels: Object.keys(reservationForMonth),    //Mes y Año
    datasets: [
        {
            label: 'Reserva por mes',
            data: Object.values(reservationForMonth),  //Cantidad de reservas
            fill: false,                               //No llenar debajo de la línea
            borderColor: 'rgb(1, 14, 1)',
            tension: 0.1,
            borderWidth: 2
        }
    ]
};

const chartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Estatísticas Anuais de Reservas',
            font: {
                size: 18
            },
            color:'#333'
        },
        legend: {
            position: 'top',
        }
    },
    scales: {
        x:{title:{ display: true, text: 'Meses'}},
        y:{title:{ display: true, text: 'Cantidad de Rservas' }, beginAtZero: true }
    }
};

//Cálculo de las métricas clave (total de reservas)
const totalReservas = reservas.length;


return (
    <div className="dashboard-container">
        <header className="dashboard-header">
        <h1>Estatísticas Anuais</h1>
        </header>

        <div className="dashboard-main">
            {/*Tarjetas de métricas clave */}
            <div className="stats-summary">
                <div className="stat-card">
                    <h3>Total de Reservas</h3>
                    <p>{totalReservas}</p>
                </div>
            </div>

            {/**Gráfico de reservas por mes */}
            <div className="statistics-container">
               <h2>Estatísticas Anuais</h2>
            
        {/*Gráfico de líneas */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Line data={chartData} options={chartOptions}/>
        </div>
       </div>
     </div>
    </div>       
  );
};

export default Dashboard;

