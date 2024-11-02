import { API_URL } from '../../config';
import { http } from '../http';

const API =  API_URL;

export const createCubicleRequest =  cubicle => http.post(`${API}/cubicle/create`, cubicle);

export const getCubiclesRequest = async () => 
    http.get(`${API}/cubicle/cubicles`);

export const getCubicleRequest = id => http.get(`${API}/cubicle/cubicles/${id}`);

export const getDeletedCubiclesRequest = async () => 
    http.get(`${API}/cubicle/deletedCubicles`);

export const updateCubicleRequest = (id, cubicle) => 
    http.put(`${API}/cubicle/update/${id}`, cubicle);

export const deleteCubicleRequest = id => http.delete(`${API}/cubicle/delete/${id}`);

export const activateCubicleRequest = id => http.put(`${API}/cubicle/activate/${id}`);

