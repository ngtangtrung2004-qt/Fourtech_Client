import { showToastError } from "../config/toastConfig";
import { http } from "../utils/http";

const AuthService = {
    Register: async (dataRegister) => {
        try {
            const { data } = await http.post('/register', dataRegister)
            return data
        } catch (error) {
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
            console.log(error);
        }
    },

    Login: async (dataLogin) => {
        try {
            const { data } = await http.post('/login', dataLogin)
            return data
        } catch (error) {
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
            console.log(error);
        }
    },

    getAllUser: async (dataAllUser) => {
        try {
            const { data } = await http.get('/all-user', dataAllUser)
            return data
        } catch (error) {
            showToastError(error.response.data.message)
            console.log(error.response.data.message);
        }
    },

    deleteUser: async (id) => {
        try {
            const { data } = await http.delete(`/delete-user/${id}`)
            return data
        } catch (error) {
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
            console.log(error);
        }
    }
}

export default AuthService