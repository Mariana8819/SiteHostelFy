import axios from './axios';

export const createEmployees = (data) => 
    axios.post('/empleados', data);

export const getAllEmployees = () =>
    axios.get('/empleados');

export const getEmployeesById = (_id) =>
    axios.get(`/empleados/${_id}`);

