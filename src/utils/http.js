import axios from "axios";
import { showToastError } from "../config/toastConfig";

export const http = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
    timeout: 3000,
    withCredentials: true
});

// http.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
//     return config
// }, function (err) {
//     return Promise.reject(err)
// })

http.interceptors.response.use(
    response => response,
    error => {
        const status = (error && error.response && error.response.status || 500);
        console.error('HTTP Status:', status);

        // Kiểm tra xem có `response` và `data` trong lỗi hay không để hiển thị thông báo phù hợp
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Lỗi không xác định. Vui lòng thử lại sau!';

        switch (status) {

            // Thêm các mã lỗi khác nếu cần
            case 400:
                showToastError(errorMessage);
                break;

            case 401:
                console.log(error.response.data);
                // showToastError("Vui lòng đăng nhập lại!");
                setTimeout(() => {
                    // window.location.href = '/login-register'
                }, 2000)
                break;

            case 403:
                showToastError(errorMessage);
                break;

            case 404:
                showToastError(errorMessage);
                break;

            case 409:
                showToastError(errorMessage);
                break;

            default:
                showToastError('Lỗi hệ thống. Vui lòng thử lại sau!');
                break;
        }

        return Promise.reject(error);
    }
);
