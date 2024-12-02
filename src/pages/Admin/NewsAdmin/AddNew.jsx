import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToastSuccess } from "../../../config/toastConfig";

function AddNew() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({
    newsName: "",
    newsContent: "",
    newsImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorValidate, setErrorValidate] = useState({});
  const [fileName, setFileName] = useState("Chưa có tệp nào được chọn");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

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
    setNewsData({
      ...newsData,
      newsImage: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    // Kiểm tra tiêu đề
    if (!newsData.newsName.trim()) {
      newError.newsName = "Tiêu đề không được để trống!";
    }

    // Kiểm tra nội dung
    if (!newsData.newsContent.trim()) {
      newError.newsContent = "Nội dung bản tin không được để trống!";
    }

    // Kiểm tra hình ảnh
    if (!newsData.newsImage || !(newsData.newsImage instanceof File)) {
      newError.newsImage = "Chưa có hình ảnh!";
    }

    // Nếu có lỗi, dừng lại không gửi form
    if (Object.keys(newError).length > 0) {
      setErrorValidate(newError);
      return;
    }

    // Gửi dữ liệu lên server
    const formData = new FormData();
    formData.append("newsName", newsData.newsName);
    formData.append("newsContent", newsData.newsContent);
    formData.append("newsImage", newsData.newsImage);

    try {
      const token = localStorage.getItem("jwt"); // Lấy token từ localStorage
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/news`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` // Gửi token trong header },
          }
        })

      if (response.data) {
        showToastSuccess("Thêm bản tin thành công!");
        navigate("/admin/news-admin");
      }
    } catch (error) {
      console.error("Lỗi khi thêm bản tin:", error);
    }
  };

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
            onChange={handleChange}
            placeholder="Nhập tiêu đề tin tức"
          />
          {errorValidate.newsName && (
            <span className="spanError">{errorValidate.newsName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="newsImage" className="custom-file-upload">
            Upload Hình ảnh
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
          <label htmlFor="newsContent">Nội dung</label>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {

              const data = editor.getData();
              console.log("data:", data);

              setNewsData({ ...newsData, newsContent: data });
            }}
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
