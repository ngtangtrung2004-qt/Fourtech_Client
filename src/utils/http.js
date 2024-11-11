import axios from "axios";

export const http = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    baseURL: "http://localhost:6060/api/",
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});