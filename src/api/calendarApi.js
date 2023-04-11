import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const API_URL = 'http://localhost:4000/api'

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// CONFIGURAR INTERCEPTORES

export default calendarApi;