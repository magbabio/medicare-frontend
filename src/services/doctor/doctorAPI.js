import { API_URL } from '../../config';
import { http } from '../http';

const API =  API_URL;

export const createDoctorRequest =  doctor => http.post(`${API}/doctor/create`, doctor);

export const getDoctorsRequest = async () => 
    http.get(`${API}/doctor/doctors`);

export const getDoctorRequest = id => http.get(`${API}/doctor/doctors/${id}`);

export const getDeletedDoctorsRequest = async () => 
    http.get(`${API}/doctor/deletedDoctors`);

export const updateDoctorRequest = (id, doctor) => 
    http.put(`${API}/doctor/update/${id}`, doctor);

export const deleteDoctorRequest = id => http.delete(`${API}/doctor/delete/${id}`);


