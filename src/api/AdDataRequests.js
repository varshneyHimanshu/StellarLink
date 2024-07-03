import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getAdData= (id)=> API.get(`/adData/${id}`);