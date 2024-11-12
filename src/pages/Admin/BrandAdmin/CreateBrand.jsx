import { useState } from "react";
import BrandService from "../../../services/brandService";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";


function CreateBrand() {
  const navigate = useNavigate()
  const [brandData, setBrandData] = useState({
    brandName: "",
    brandImage: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorValidate, setErrorValidate] = useState({})
  const [fileName, setFileName] = useState('Chưa có tệp nào được chọn');



  // cập nhật tên thương hiệu trong state khi người dùng nhập liệu.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData({
      ...brandData,
      [name]: value,
    });

  };
  //cập nhật ảnh thương hiệu khi người dùng chọn một file.
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!brandData.brandName.trim()) {
      newError.brandName = "Tên thương hiệu không được để trống!"
    }

    // Kiểm tra hình ảnh
    if (!brandData.brandImage || !(brandData.brandImage instanceof File)) {
      //brandData.brandImage instanceof File kiểm tra xem brandData.brandImage có phải là một đối tượng File hợp lệ hay không.
      //Nếu điều kiện này trả về true, tức là người dùng đã chọn một tệp hợp lệ.
      //Nếu trả về false, có thể tệp không được chọn, hoặc có sự cố khác với dữ liệu mà bạn nhận được.
      newError.brandImage = "Chưa có hình ảnh!";
    }

    // Nếu có lỗi, dừng lại không gửi form
    if (Object.keys(newError).length > 0) {
      setErrorValidate(newError);  // Cập nhật lỗi
      console.log('Form errors:', newError); // Log errors to debug
      return;  // Dừng và không gọi API
    }
    // Nếu không có lỗi, tiến hành gửi dữ liệu lên server
    const formData = new FormData();
    formData.append("brandName", brandData.brandName);
    formData.append("brandImage", brandData.brandImage);

    const data = await BrandService.postBrand(formData);
    switch (data && data.data && data.data.EC) {
      case 1:
        showToastError(data.data.message);
        break;
      case 0:
        showToastSuccess(data.data.message);
        navigate('/admin/brand-admin');
        break;
      case -1:
        showToastError("Lỗi hệ thống. Vui lòng thử lại sau!");
        break;
      default:
        break;
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
          />
          {errorValidate.brandName && ((<span className="spanError">{errorValidate.brandName}</span>))}
        </div>

        <div className="form-group">
          <label htmlFor="brandImage" className="custom-file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            Up load file
          </label>
          <input
            type="file"
            id="brandImage"
            name="brandImage"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <p>Tên tệp: {fileName}</p>
          {errorValidate.brandImage && ((<span className="spanError">{errorValidate.brandImage}</span>))}
          {imagePreview && (
            <div>
              <h4>Preview:</h4>
              <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: 'auto' }} />
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
