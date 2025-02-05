import axios from './axios';

export const createBed = (data) => 
    axios.post('/camas', data);

export const getAllBeds = () =>
    axios.get('/camas');

export const getBedById = (_id) =>
    axios.get(`/camas/${_id}`);

