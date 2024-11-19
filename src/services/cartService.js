import { http } from "../utils/http";

const CartService = {
    getCart: async (idUser) => {
        try {
            const { data } = await http.get(`/cart/${idUser}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartService