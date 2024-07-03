import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getAllComments = (id) => API.get(`/comment/getAllComments/${id}`);
export const createComment = (id,user_id,comment) =>  API.put(`/comment/createComment/${id}`, { user_id: user_id,comment:comment });