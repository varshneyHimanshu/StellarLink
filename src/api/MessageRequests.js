import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: port });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);