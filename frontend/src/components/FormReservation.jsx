import { useState } from "react";
import { createReservation } from "../api/reservas";


const FormReservation = () => {
    const [formData, setFormData] = useState({
        huesped:'',
        habitacion:'',
        empleado:'',
        fechaCheckIn:'',
        fechaCheckOut:'',
        total: 0,
        estado: 'confirmada',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReservation(formData);
            alert('Reserva creada exitosamente');
            setFormData({
                huesped: '',
                habitacion: '',
                empleado: '',
                fechaCheckIn: '',
                fechaCheckOut: '',
                total: 0,
                estado: 'confirmada',
            });
        } catch (error) {
            console.error('Error creando reserva:', error);
            alert('Error al crear la reserva');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="huesped"
                placeholder="ID del Huésped"
                value={formData.huesped}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="habitacion"
                placeholder="ID de la Habitación"
                value={formData.habitacion}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="empleado"
                placeholder="ID del Empleado"
                value={formData.empleado}
                onChange={handleChange}
                required
            />
            <input
                type="datetime-local"
                name="fechaCheckIn"
                value={formData.fechaCheckIn}
                onChange={handleChange}
                required
            />
            <input
                type="datetime-local"
                name="fechaCheckOut"
                value={formData.fechaCheckOut}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="total"
                placeholder="Total"
                value={formData.total}
                onChange={handleChange}
                required
            />
            <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
            >
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
                <option value="completada">Completada</option>
            </select>
            <button type="submit">Crear Reserva</button>
        </form>
     )
}

export default FormReservation;