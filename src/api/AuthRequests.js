import axios from 'axios'

const port = process.env.BACKEND_URL;


const API = axios.create({ baseURL: port });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);
