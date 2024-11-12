import { showToastError } from "../config/toastConfig";
import { http } from "../utils/http";


const BrandService = {
    getAllBrand: async (dataAllCategory) => {
        try {
            const { data } = await http.get('/brand', dataAllCategory)
            return data
        } catch (error) {
            console.log(error);
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
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
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
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
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!");
            console.error(error);
        }
    },

    deleteBrand: async (id) => {
        try {
            const { data } = await http.delete(`/brand/delete/${id}`)
            return data
        } catch (error) {
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
            console.error(error);
        }
    }
}

export default BrandService