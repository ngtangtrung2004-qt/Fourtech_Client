import { useState } from "react";
import "./product.css";
function CreateProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productQuantity: "",
    productDescription: "",
    productDate:"",
    productCategory: "",
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // các dữ liệu khác
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    // lưu file ảnh 
    setFormData({
      ...formData,
      productImage: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý form data ở đây, ví dụ: gửi dữ liệu đến API
    console.log(formData);
  };
  return (
    <>
      <div className="product-form-container">
        <h2>Thêm Sản Phẩm Mới</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Tên Sản Phẩm</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Giá Sản Phẩm</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              placeholder="Nhập giá sản phẩm"
            />
          </div>
           <div className="form-group">
            <label htmlFor="productQuantity">Số lượng sản phẩm</label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleChange}
              placeholder="Nhập số lượng sản phẩm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productDate">Ngày thêm</label>
            <input
              type="date"
              id="productDate"
              name="productDate"
              value={formData.productDate}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩ"
            />
          </div>


          <div className="form-group">
            <label htmlFor="productCategory">Danh Mục Sản Phẩm</label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              <option value="electronics">Điện tử</option>
              <option value="fashion">Thời trang</option>
              <option value="beauty">Mỹ phẩm</option>
              <option value="home">Đồ gia dụng</option>
              <option value="sports">Thể thao</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Hình Ảnh Sản Phẩm</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              onChange={handleFileChange}
            />
          <div className="form-group">
            <label htmlFor="productDescription">Mô Tả Sản Phẩm</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              rows="4"
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>
          </div>

          <button type="submit" className="submit-btn">
            Thêm Sản Phẩm
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
