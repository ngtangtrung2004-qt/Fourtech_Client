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
            console.log(data);

            return data
        } catch (error) {
            console.log(error);
        }
    }
}

export default AuthService