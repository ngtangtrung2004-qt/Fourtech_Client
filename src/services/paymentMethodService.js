import { http } from "../utils/http";

const PaymentMethod = {
    postPaymentMomo: async (dataPayment) => {
        try {
            const data = await http.post('/create_payment_momo', dataPayment)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    postPaymentCOD: async (dataPayment) => {
        try {
            const { data } = await http.post('/create_payment_cod', dataPayment)
            return data
        } catch (error) {
            console.log(error);
        }
    }
}

export default PaymentMethod