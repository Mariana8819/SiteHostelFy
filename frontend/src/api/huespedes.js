import axios from './axios';

export const createHuesped = (data) => 
    axios.post('/huespedes', data);

export const getAllHuespedes = () =>
    axios.get('/huespedes');

export const getHuespedById = (_id) =>
    axios.get(`/huespedes/${_id}`);

