import { useState } from "react";
// import axios from "axios";
function Createbrand() {
  const [brandData, setbrandData] = useState({
    brandName: "",
    brandImage: null,
  });
  // cập nhật tên danh mục trong state khi người dùng nhập liệu.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setbrandData({
      ...brandData,
      [name]: value,
    });
  };
  //cập nhật ảnh danh mục khi người dùng chọn một file.
  const handleFileChange = (e) => {
    setbrandData({
      ...brandData,
      brandImage: e.target.files[0],
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây, ví dụ: gửi dữ liệu lên server hoặc API
  
  };
  return (
    <div className="brand-form-container">
      <h2>Thêm Thương Hiệu Mới</h2>
      <form className="brand-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Tên Danh Mục</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={brandData.brandName}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
          />
        </div>

        <div className="form-group">
          <label htmlFor="brandImage">Hình Ảnh Thương hiệu</label>
          <input
            type="file"
            id="brandImage"
            name="brandImage"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Thêm Thương hiệu
        </button>
      </form>
    </div>
  );
}

export default Createbrand;
