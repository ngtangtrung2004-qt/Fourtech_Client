import { useState } from "react";
import BrandService from "../../../services/brandService";
import { showToastSuccess } from "../../../config/toastConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

function CreateBrand() {
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState({
    brandName: "",
    brandImage: null,
    idCategory: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorValidate, setErrorValidate] = useState({});
  const [fileName, setFileName] = useState("Chưa có tệp nào được chọn");

  // Cập nhật tên thương hiệu trong state khi người dùng nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData({
      ...brandData,
      [name]: value,
    });
  };

  // Cập nhật ảnh thương hiệu khi người dùng chọn một file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      setFileName(e.target.files[0].name);
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
    setBrandData({
      ...brandData,
      brandImage: file,
    });
  };

  // Xử lý khi người dùng gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    // Kiểm tra tên thương hiệu
    if (!brandData.brandName.trim()) {
      newError.brandName = "Tên thương hiệu không được để trống!";
    }

    // Kiểm tra hình ảnh
    if (!brandData.brandImage || !(brandData.brandImage instanceof File)) {
      newError.brandImage = "Chưa có hình ảnh!";
    }

    // Nếu có lỗi, dừng lại không gửi form
    if (Object.keys(newError).length > 0) {
      setErrorValidate(newError); // Cập nhật lỗi
      return; // Dừng và không gọi API
    }

    // Nếu không có lỗi, tiến hành gửi dữ liệu lên server
    const formData = new FormData();
    formData.append("brandName", brandData.brandName);
    formData.append("brandImage", brandData.brandImage);
    
    const data = await BrandService.postBrand(formData);

    if (data && data.data && data.data.EC === 0) {
      showToastSuccess(data.data.message);
      navigate("/admin/brand-admin");
    }
  };

  return (
    <div className="brand-form-container">
      <h2>Thêm Thương Hiệu Mới</h2>
      <form className="brand-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Tên Thương Hiệu</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={brandData.brandName}
            onChange={handleChange}
            placeholder="Nhập tên thương hiệu"
            style={{ marginBottom: 0 }}
          />
          {errorValidate.brandName && (
            <span className="spanError">{errorValidate.brandName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="brandImage" className="custom-file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            Upload file
          </label>
          <input
            type="file"
            id="brandImage"
            name="brandImage"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p>Tên tệp: {fileName}</p>
          {errorValidate.brandImage && (
            <span className="spanError">{errorValidate.brandImage}</span>
          )}
          {imagePreview && (
            <div>
              <h4>Preview:</h4>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "100px", height: "auto" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Thêm
        </button>
      </form>
    </div>
  );
}

export default CreateBrand;
