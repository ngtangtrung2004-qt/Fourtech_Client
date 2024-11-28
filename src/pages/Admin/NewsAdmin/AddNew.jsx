import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { showToastSuccess } from "../../../config/toastConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddNew() {
  const navigate = useNavigate();
  const [newsData, setnewsData] = useState({
    newsName: "",
    newsContent: "",
    newsImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorValidate, setErrorValidate] = useState({});
  const [fileName, setFileName] = useState("Chưa có tệp nào được chọn");

    const handleChange = (e) => {
        const { name, value } = e.target;
    setnewsData({
      ...newsData,
      [name]: value,
    });
  };
  console.log('data',newsData)
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
    setnewsData({
      ...newsData,
      newsImage: file,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    // Kiểm tra tên thương hiệu
    if (!newsData.newsName.trim()) {
      newError.newsName = "Tên thương hiệu không được để trống!";
    }

    // Kiểm tra hình ảnh
    if (!newsData.newsImage || !(newsData.newsImage instanceof File)) {
      newError.newsImage = "Chưa có hình ảnh!";
    }

     if (!newsData.newsContent.trim()) {
      newError.newsContent = "Tên thương hiệu không được để trống!";
    }

    // Nếu có lỗi, dừng lại không gửi form
    if (Object.keys(newError).length > 0) {
      setErrorValidate(newError); // Cập nhật lỗi
      return; // Dừng và không gọi API
    }

    // Nếu không có lỗi, tiến hành gửi dữ liệu lên server
    const formData = new FormData();
    formData.append("newsName", newsData.newsName);
    formData.append("newsContent", newsData.newsContent);
    formData.append("newsImage", newsData.newsImage);
    console.log(formData)
    const data = await axios.post( `${import.meta.env.VITE_API_URL}/api/news`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('data',data)
    if (data) {
      showToastSuccess("thêm bản tin thành công");
      navigate("/admin/news-admin");
    }
  };
//   console.log(newsData)
  return (
    <div className="news-form-container">
      <h2>Thêm Tin tức</h2>
      <form className="news-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newsName">Tiêu đề</label>
          <input
            type="text"
            id="newsName"
            name="newsName"
            // value={newsData.newsName}
            onChange={handleChange}
            placeholder="Nhập tiêu đề tin tức"
            style={{ marginBottom: 0 }}
          />
          {errorValidate.newsName && (
            <span className="spanError">{errorValidate.newsName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="newsImage" className="custom-file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            Upload file
          </label>
          <input
            type="file"
            id="newsImage"
            name="newsImage"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p>Tên tệp: {fileName}</p>
          {errorValidate.newsImage && (
            <span className="spanError">{errorValidate.newsImage}</span>
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
        <div className="form-group">
          <label htmlFor="newsName">Nội Dung</label>
          <textarea
            id="newsContent"
            name="newsContent"
            rows="4"
            // value={newsData.newsName}
            onChange={handleChange}
            placeholder="Nhập nội dung tin tức"
            style={{ marginBottom: 0 }}
          />
          {errorValidate.newsContent && (
            <span className="spanError">{errorValidate.newsContent}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Thêm
        </button>
      </form>
    </div>
  );
}

export default AddNew;
