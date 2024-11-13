import { http } from "../utils/http";


const BrandService = {
    getAllBrand: async (dataAllCategory) => {
        try {
            const { data } = await http.get('/brand', dataAllCategory)
            return data
        } catch (error) {
            console.log(error);
        }
    },

    postBrand: async (formData) => {
        try {
            const data = await http.post('/brand/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (error) {
            console.error(error);
        }
    },

    putBrand: async (id, formData) => {
        try {
            const { data } = await http.put(`/brand/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo server hiểu đây là `FormData`
                },
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    deleteBrand: async (id) => {
        try {
            const { data } = await http.delete(`/brand/delete/${id}`)
            return data
        } catch (error) {
            console.error(error);
        }
    },

    getBrandsByCategory: async (idCategory) => {
        try {
            const data = await http.get(`/brand/categor/${idCategory}`);
            return data
        } catch (error) {
            console.log(error);
        }
    }
}

export default BrandService