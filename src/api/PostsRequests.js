import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_URL;

const API = axios.create({ baseURL: port });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`/posts/${id}/like`, {userId: userId})
export const deletePost = (id,userId)=> API.delete(`/posts/${id}`,{ data: { userId: userId } });