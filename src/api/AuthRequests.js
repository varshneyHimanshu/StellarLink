import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_URL;


const API = axios.create({ baseURL: port });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);
