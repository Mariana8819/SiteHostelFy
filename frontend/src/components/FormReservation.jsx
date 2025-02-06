import { useEffect, useState } from "react";
import { createReservaWithHuesped } from "../api/reservas";
import { getAllEmployees } from "../api/empleados";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormReservation = ({ onReservaCreada, setSelectedCama, setSelectedDia}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cama, dia } = location.state || {};

    const [formData, setFormData] = useState({
        cama: cama ? cama._id : '', 
        nombre:'',
        apellido: '',
        dni: '',
        telefono:'',
        domicilio:'',
        email: '',
        habitacion: cama ? cama.habitacion : '',
        empleado:'',
        fechaCheckIn: dia ? new Date(dia).toISOString().slice(0, 16) :'',
        fechaCheckOut:'',
        total: 0,
        estado: 'confirmada',
    });

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const empleadosResponse = await getAllEmployees();
                setEmpleados(empleadosResponse.data);

            } catch (error) {
                console.error("Erro ao obter dados:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Preparamos el objeto de datos para enviar
         const dataToSend = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            dni: formData.dni,
            telefono: formData.telefono,
            domicilio: formData.domicilio,
            email: formData.email,
            reservaData : {                
                camas: [formData.cama],    
                habitacion: formData.habitacion,
                empleado: formData.empleado,
                fechaCheckIn: formData.fechaCheckIn,
                fechaCheckOut: formData.fechaCheckOut,
                total: formData.total,
                estado: formData.estado,
        }
    };
        
        try {              
              const response = await createReservaWithHuesped(dataToSend);     
            
            //   alert('Reserva y huésped creados exitosamente');
            //   console.log('Respuesta de reserva y huésped:', response.data);  
              
             
              Swal.fire({
                title: "¡Reserva creada!",
                text: "La reserva y el huésped se han creado exitosamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                 // Limpiar el formulario 
        setFormData({
            cama: '',
            nombre: '',
            apellido: '',
            dni: '',
            telefono: '',
            domicilio: '',
            email: '',
            habitacion: '',
            empleado: '',
            fechaCheckIn: '',
            fechaCheckOut: '',
            total: 0,
            estado: 'confirmada',
        });

        // Cerrar el formulario 
        if (setSelectedCama) setSelectedCama(null);
        if (setSelectedDia) setSelectedDia(null);

        //Actualizar el calendario
        if (onReservaCreada) {
            onReservaCreada();
        }

        navigate('/calendar');
    });

        } catch (error) {
            console.error('Error creando reserva o huesped:', error);
            
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear la reserva y el huésped.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Criar Nova Reserva</h2>

            <label htmlFor="nombre">Nombre del Huésped</label>
            <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <label htmlFor="apellido">Apellido del Huésped</label>
            <input
                type="text"
                name="apellido"
                id="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
            />
            <label htmlFor="dni">DNI del Huésped</label>
            <input
                type="text"
                name="dni"
                id="dni"
                value={formData.dni}
                onChange={handleChange}
                required
            />
            <label htmlFor="telefono">Telefono del Huésped</label>
            <input
                type="text"
                name="telefono"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
            />
            <label htmlFor="domicilio">Domicilio del Huésped</label>
            <input
                type="text"
                name="domicilio"
                value={formData.domicilio}
                onChange={handleChange}            
            />
            <label htmlFor="email">Email del Huésped</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <label htmlFor="empleado">Empleado</label>
            <select
                name="empleado"
                id="empleado"
                value={formData.empleado}
                onChange={handleChange}
                required
            >
                <option value="">Seleccion un empleado</option>
                {empleados.map((empleado) => (
                    <option key={empleado._id} value={empleado._id}>
                        {empleado.nombre} {empleado.apellido}
                    </option>
                ))}
            </select>
            <label htmlFor="fechaCheckIn">Data Check-In</label>
            <input
                type="datetime-local"
                name="fechaCheckIn"
                id="fechaCheckIn"
                value={formData.fechaCheckIn}
                onChange={handleChange}
                required
            />
            <label htmlFor="fechaCheckOut">Data Check-Out</label>
            <input
                type="datetime-local"
                name="fechaCheckOut"
                id="fechaCheckOut"
                value={formData.fechaCheckOut}
                onChange={handleChange}
                required
            />
            <label htmlFor="total">Total</label>
            <input
                type="number"
                name="total"
                id="total"
                placeholder="Total"
                value={formData.total}
                onChange={handleChange}
                required
            />

            <button type="submit" className="button">Crear Reserva</button>
        </form>
     )
}

export default FormReservation;