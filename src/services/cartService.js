import { http } from "../utils/http";

const CartService = {
    getCart: async (idUser) => {
        try {
            const { data } = await http.get(`/cart/${idUser}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    postCart: async (cartData) => {
        try {
            const { data } = await http.post(`/add-to-cart`, cartData);
            return data; // Trả về phản hồi từ server
        } catch (error) {
            console.log(error);
        }
    },

    deleteCartItem: async (cartId, productId) => {
        try {
            const { data } = await http.delete(`/delete-cart_item/${cartId}/product/${productId}`);
            return data; // Trả về phản hồi từ server
        } catch (error) {
            console.log(error);
        }
    },
}

export default CartService