import axios from "axios";

export const http = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
    timeout: 3000,
    // withCredentials: true
});
// http.interceptors.response.use(function (response) {
//     return response.data
// }, function (err) {
//     const status = err && err.response && err.response.status || 500;
//     console.log(status);
//     switch (status) {
//         // authentication (token related issues)
//         case 401: {
//             return Promise.reject(err)
//         }

//         // forbidden (permission related issues)
//         case 403: {
//             return Promise.reject(err)
//         }

//         // bad request
//         case 400: {
//             return Promise.reject(err)
//         }

//         // not found
//         case 404: {
//             return Promise.reject(err)
//         }

//         // conflict
//         case 409: {
//             return Promise.reject(err)
//         }

//         // unprocessable
//         case 422: {
//             return Promise.reject(err)
//         }

//         // generic api error (server related) unexpected
//         default: {
//             return Promise.reject(err)
//         }
//     }
// })