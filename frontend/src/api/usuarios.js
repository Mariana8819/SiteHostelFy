import axios from './axios';

export const createUser = (data) =>
    axios.post('/usuarios', data);

export const getUserByParams = ( username, password) =>
    axios.get('/usuarios', {
        params: {username, password}
    });

export const getAllUser = () =>
    axios.get('/usuarios');

export const getUserById = (_id) =>
    axios.get(`/usuarios/${_id}`);