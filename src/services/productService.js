import { http } from "../utils/http";


const ProductService = {
    getAllProduct: () => {

    },

    getOneProduct: () => {

    },

    postProduct: async (formData) => {
        try {
            const { data } = await http.post('/product/create', formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    putProduct: () => {

    },

    deleteProduct: () => {

    }
}


export default ProductService