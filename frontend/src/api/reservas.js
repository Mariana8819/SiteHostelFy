import axios from './axios';

export const createReservation = (data) =>
    axios.post('/reservas', data);

export const createReservaWithHuesped = (dataToSend) =>
    axios.post('/reservas/reserva-huesped', dataToSend);


export const getAllReservation = () => 
    axios.get('/reservas');

export const getReservationByID = (_id) =>
    axios.get(`/reservas/${_id}`);

