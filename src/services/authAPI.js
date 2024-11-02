import { API_URL } from 'config';
import { http } from './http';

const API = API_URL;

export const loginRequest = async (credentials) => {
    try {
        const response = await http.post(`${API}/user/login`, credentials);
        return response.data; // Asegúrate de que el backend retorne un token
    } catch (error) {
        throw error; 
    }
};

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'admin';
    } catch (error) {
        console.error("Error al decodificar el token", error);
        return false;
    }
};

export const verifyTokenRequest = async () => http.get(`${API}/auth/verifyToken`);
