import { showToastError } from "../config/toastConfig";
import { http } from "../utils/http";

const CategoryService = {
    getAllCategory: async (dataAllCategory) => {
        try {
            const { data } = await http.get('/category', dataAllCategory)
            return data
        } catch (error) {
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
            console.log(error);
        }
    },

    postCategory: async (formData) => {
        try {
            const data = await http.post('/category/create', formData, {
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

    putCategory: async (id, formData) => {
        try {
            const { data } = await http.put(`/category/update/${id}`, formData, {
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

    deleteCategory: async (id) => {
        try {
            const { data } = await http.delete(`/category/delete/${id}`)
            return data
        } catch (error) {
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
            console.error(error);
        }
    }
}

export default CategoryService