import axios from "axios";

const port = process.env.REACT_APP_BACKEND_URL;

const API = axios.create({ baseURL: port });

export const getAllComments = (id) => API.get(`/comment/getAllComments/${id}`);
export const createComment = (id,user_id,comment) =>  API.put(`/comment/createComment/${id}`, { user_id: user_id,comment:comment });