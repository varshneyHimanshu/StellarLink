import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: port });

export const getAdData= (id)=> API.get(`/adData/${id}`);