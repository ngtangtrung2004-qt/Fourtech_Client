import { useState } from "react";
import CategoryService from "../../../services/categoryService";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";


function CreateCategory() {
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryImage: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorValidate, setErrorValidate] = useState({})
  const [fileName, setFileName] = useState('Chưa có tệp nào được chọn');


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
    const file = e.target.files[0];
    setFileName(e.target.files[0].name);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
    setCategoryData({
      ...categoryData,
      categoryImage: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!categoryData.categoryName.trim()) {
      newError.categoryName = "Tên danh mục không được để trống!"
    }

    // Kiểm tra hình ảnh
    if (!categoryData.categoryImage || !(categoryData.categoryImage instanceof File)) {
      //categoryData.categoryImage instanceof File kiểm tra xem categoryData.categoryImage có phải là một đối tượng File hợp lệ hay không.
      //Nếu điều kiện này trả về true, tức là người dùng đã chọn một tệp hợp lệ.
      //Nếu trả về false, có thể tệp không được chọn, hoặc có sự cố khác với dữ liệu mà bạn nhận được.
      newError.categoryImage = "Chưa có hình ảnh!";
    }

    // Nếu có lỗi, dừng lại không gửi form
    if (Object.keys(newError).length > 0) {
      setErrorValidate(newError);  // Cập nhật lỗi
      return;  // Dừng và không gọi API
    }
    if (typeof categoryData.categoryImage === 'string') {
      showToastError('Vui lòng chọn ảnh hợp lệ trước khi cập nhật!');
      return;
    }
    // Nếu không có lỗi, tiến hành gửi dữ liệu lên server
    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("categoryImage", categoryData.categoryImage);

    const data = await CategoryService.postCategory(formData);

    if (data && data.data && data.data.EC === 0) {
      showToastSuccess(data.data.message);
      navigate('/admin/category-admin');
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
          {errorValidate.categoryName && ((<span className="spanError">{errorValidate.categoryName}</span>))}
        </div>

        <div className="form-group">
          <label htmlFor="categoryImage" className="custom-file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            Up load file
          </label>
          <input
            type="file"
            id="categoryImage"
            name="categoryImage"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Tên tệp: {fileName}</p>
          {errorValidate.categoryImage && ((<span className="spanError">{errorValidate.categoryImage}</span>))}
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

export default CreateCategory;
