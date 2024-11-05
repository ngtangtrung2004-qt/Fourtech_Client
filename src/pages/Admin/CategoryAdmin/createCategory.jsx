import { useState } from "react";
import axios from "axios";
function CreateCategory() {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryImage: null,
  });
  // cập nhật tên danh mục trong state khi người dùng nhập liệu.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };
  //cập nhật ảnh danh mục khi người dùng chọn một file.
  const handleFileChange = (e) => {
    setCategoryData({
      ...categoryData,
      categoryImage: e.target.files[0],
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây, ví dụ: gửi dữ liệu lên server hoặc API
    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("categoryImage", categoryData.categoryImage);
    console.log(categoryData);
     try {
      // Gửi yêu cầu POST tới API server
      const response = await axios.post("http://localhost:3001/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Danh mục mới đã được thêm thành công!");
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };
  return (
    <div className="category-form-container">
      <h2>Thêm Danh Mục Mới</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Tên Danh Mục</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryData.categoryName}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryImage">Hình Ảnh Danh Mục</label>
          <input
            type="file"
            id="categoryImage"
            name="categoryImage"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Thêm Danh Mục
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
