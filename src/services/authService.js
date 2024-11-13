import { http } from "../utils/http";

const AuthService = {
    Register: async (dataRegister) => {
        try {
            const { data } = await http.post('/register', dataRegister)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    Login: async (dataLogin) => {
        try {
            const { data } = await http.post('/login', dataLogin)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    getAllUser: async (dataAllUser) => {
        try {
            const { data } = await http.get('/all-user', dataAllUser)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (id) => {
        try {
            const { data } = await http.delete(`/delete-user/${id}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
}

export default AuthService