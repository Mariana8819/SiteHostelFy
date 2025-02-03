import axios from './axios';

export const createRoom = (data) =>
    axios.post('/habitaciones', data);

export const getAllRooms = () =>
    axios.get('/habitaciones');

export const getRomById = (_id) =>
    axios.get(`/habitaciones/${_id}`);