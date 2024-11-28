import { http } from "../utils/http";

const AuthService = {
    getAccount: async (user) => {
        try {
            const dataUser = await http.get('/account', user)
            return dataUser.data
        } catch (error) {
            console.log(error);
        }
    },

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

    Logout: async () => {
        try {
            const { data } = await http.post('/logout')
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

    getOneUser: async (idUser) => {
        try {
            const { data } = await http.get(`/user/${idUser}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (idUser, formData) => {
        try {
            const { data } = await http.put(`/user/${idUser}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
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
    },

}

export default AuthService