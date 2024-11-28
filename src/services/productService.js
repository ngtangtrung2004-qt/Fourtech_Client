import { showToastError } from "../config/toastConfig";
import { http } from "../utils/http";


const ProductService = {
    getAllProduct: async (data) => {
        try {
            const dataProduct = await http.get('/product', data)
            return dataProduct.data.data
        } catch (error) {
            console.log(error);
        }
    },

    getAllProductTrash: async (data) => {
        try {
            const dataProductTrash = await http.get('/product-trash', data)
            return dataProductTrash.data.data
        } catch (error) {
            console.log(error);
        }
    },

    getOneProduct: async (id) => {
        try {
            const { data } = await http.get(`/product/${id}`)
            return data
        } catch (error) {
            console.log(error);
        }
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
            showToastError(error.response.data.error)
            console.log(error);
        }
    },

    postProductIncreaseView: async (id) => {
        try {
            const { data } = await http.post(`product/increase-view/${id}`)
            return data;
        } catch (error) {
            showToastError(error.response.data.error)
            console.log(error);
        }
    },

    putProduct: async (id, formData) => {
        try {
            const data = await http.put(`/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (error) {
            showToastError(error.response.data.error)
            console.log(error);
        }
    },

    deleteSoftProduct: async (id) => {
        try {
            const { data } = await http.delete(`/product/delete-soft/${id}`)
            return data
        } catch (error) {
            console.error(error);
        }
    },

    restoreProduct: async (id) => {
        try {
            const { data } = await http.put(`/product/restore/${id}`)
            return data
        } catch (error) {
            console.error(error);
        }
    },

    deleteProduct: async (id) => {
        try {
            const { data } = await http.delete(`/product/delete/${id}`)
            return data
        } catch (error) {
            console.error(error);
        }
    },

    getProductByCategory: async (idCategory) => {
        try {
            const {data} = await http.get(`/category/${idCategory}/products`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}


export default ProductService