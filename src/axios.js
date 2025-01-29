import axios from 'axios';
import { apiUrl } from './API';

export const axiosInstance =
    axios.create({
        baseURL: apiUrl,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });