import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_URL_LOC}/api`,

    withCredentials: true,
});

export default instance;