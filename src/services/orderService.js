import { http } from "../utils/http";

const OrderService = {
    getAllOrder: async (dataOrder) => {
        try {
            const { data } = await http.get('/all-order', dataOrder)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    getOrderByUser: async (idUser) => {
        try {
            const { data } = await http.get(`/order-by-user/${idUser}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    getOrderDetail: async (dataOrderDetail) => {
        try {
            const { data } = await http.get(`/order/${dataOrderDetail}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    putOrder: async (orderIdCode, updates) => {
        try {
            const { data } = await http.put(`/update/${orderIdCode}`, updates)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    putCancelOrder: async (orderIdCode) => {
        try {
            const { data } = await http.put(`/cancel-order/${orderIdCode}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    putFinishOrder: async (orderIdCode) => {
        try {
            const { data } = await http.put(`/finish-order/${orderIdCode}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },
}

export default OrderService