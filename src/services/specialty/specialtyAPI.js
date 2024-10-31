import { API_URL } from '../../config';
import { http } from '../http';

const API =  API_URL;

export const createSpecialtyRequest =  specialty => http.post(`${API}/specialty/create`, specialty);

export const getSpecialtiesRequest = async () => 
    http.get(`${API}/specialty/specialties`);

export const getSpecialtyRequest = id => http.get(`${API}/specialty/specialties/${id}`);

export const getDeletedSpecialtiesRequest = async () => 
    http.get(`${API}/specialty/deletedSpecialties`);

export const updateSpecialtyRequest = (id, specialty) => 
    http.put(`${API}/specialty/update/${id}`, specialty);

export const deleteSpecialtyRequest = id => http.delete(`${API}/specialty/delete/${id}`);


