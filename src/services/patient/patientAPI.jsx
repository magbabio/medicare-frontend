import { API_URL } from '../../config';
import { http } from '../http';

const API =  API_URL;

export const getPatientsRequest = async () => 
    http.get(`${API}/patient/patients`);
