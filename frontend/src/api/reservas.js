import axios from './axios';

export const createReservation = (data) =>
    axios.post('/reservas', data);

export const getAllReservation = () => 
    axios.get('/reservas');

export const getReservationByID = (_id) =>
    axios.get(`/reservas/${_id}`);