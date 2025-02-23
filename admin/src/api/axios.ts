import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-f470lga4h-jazeemmps-projects.vercel.app/api/admin',
    withCredentials: true,
});
export default api;