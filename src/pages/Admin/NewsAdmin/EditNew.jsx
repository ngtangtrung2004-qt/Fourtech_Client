import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showToastSuccess, showToastError } from "../../../config/toastConfig";

function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({
    newsName: "",
    newsContent: "",
    newsImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null); // Hiển thị ảnh hiện tại hoặc ảnh mới
  const [errorValidate, setErrorValidate] = useState({});
  const [fileName, setFileName] = useState("Chưa có tệp nào được chọn");

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  const fetchNewsDetail = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy token từ localStorage
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/news/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
      if (response?.data?.EC === 0) {
        const data = response.data.data;
        // Gán trực tiếp giá trị từ API vào state
        setNewsData({
          newsName: data.title || "", // Gán tiêu đề từ API
          newsContent: data.content || "", // Gán nội dung từ API
          newsImage: null, // Đặt giá trị ban đầu của ảnh
        });
        setImagePreview(`${import.meta.env.VITE_API_URL}/uploads/${data.image}`);
      }

    } catch (error) {
      console.error("Lỗi khi lấy tin tức:", error);
      showToastError("Không thể tải thông tin tin tức!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      setFileName(file.name);
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

    // Nếu có lỗi, dừng lại không gửi form
    if (Object.keys(newError).length > 0) {
      setErrorValidate(newError);
      return;
    }

    // Gửi dữ liệu lên server
    const formData = new FormData();
    formData.append("title", newsData.newsName);
    formData.append("content", newsData.newsContent);
    if (newsData.newsImage) {
      formData.append("image", newsData.newsImage); // Gửi ảnh mới nếu có
    }

    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/news/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, },
        }
      );

      if (response.data) {
        showToastSuccess("Cập nhật bản tin thành công!");
        navigate("/admin/news-admin");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bản tin:", error);
      showToastError("Cập nhật bản tin thất bại!");
    }
  };
  // console.log(newsData)

  return (
    <div className="news-form-container">
      <h2>Chỉnh sửa Tin tức</h2>
      <form className="news-form" onSubmit={handleSubmit}>
        {/* Tiêu đề */}
        <div className="form-group">
          <label htmlFor="newsName">Tiêu đề</label>
          <input
            type="text"
            id="newsName"
            name="newsName"
            value={newsData.newsName}
            onChange={handleChange}
            placeholder="Nhập tiêu đề tin tức"
          />
          {errorValidate.newsName && (
            <span className="spanError">{errorValidate.newsName}</span>
          )}
        </div>

        {/* Hình ảnh */}
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

        {/* Nội dung */}
        <div className="form-group">
          <label htmlFor="newsContent">Nội dung</label>
          <CKEditor
            editor={ClassicEditor}
            data={newsData.newsContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNewsData((pre) => ({
                ...pre, newsContent: data
              }));
            }}
          />
          {errorValidate.newsContent && (
            <span className="spanError">{errorValidate.newsContent}</span>
          )}
        </div>

        {/* Nút lưu */}
        <button type="submit" className="submit-btn">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default EditNews;
