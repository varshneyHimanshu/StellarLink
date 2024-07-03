import axios from 'axios'


const port = process.env.BACKEND_URL;
const API = axios.create({ baseURL: port });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);