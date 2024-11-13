import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import "./edit.css";
import CategoryService from "../../../services/categoryService"; // Đảm bảo rằng service này có phương thức putCategory
import { showToastSuccess } from "../../../config/toastConfig";

function EditCategory({ categoryItem, onEditSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    id: categoryItem.id,
    name: categoryItem.name || "",
    image: categoryItem.image,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditCategory = (item) => {
    setCategoryInfo({
      id: categoryItem.id,
      name: item.name || "",
      image: item.image || null,
    });
    setIsModalOpen(true);
  };

  const handleChangeName = (e) => {
    const { value } = e.target;
    setCategoryInfo((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);

      // Cập nhật state với ảnh mới
      setCategoryInfo({
        ...categoryInfo,
        image: file, // Đặt trực tiếp file vào `image`
      });
    }
  };



  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Gửi yêu cầu cập nhật danh mục
    try {
      const idCategory = categoryInfo.id
      const formData = new FormData();
      formData.append('categoryName', categoryInfo.name);
      formData.append('categoryImage', categoryInfo.image);

      let data = await CategoryService.putCategory(idCategory, formData);

      if(data && data.EC === 0) {
        showToastSuccess(data.message)
        setIsModalOpen(false);
        onEditSuccess(); // Gọi callback để cập nhật lại danh sách trong `CategoryAdmin`
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCategoryInfo(categoryItem);
    setImagePreview(null);
  };

  useEffect(() => {
    // console.log("Updated categoryInfo:", categoryInfo);
  }, [categoryInfo]);

  return (
    <>
      <Button type="primary" onClick={() => handleEditCategory(categoryItem)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>
      <Modal
        title="Sửa Danh Mục"
        className="modal-edit"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
        getContainer={false}
      >
        <form className="form-edit-category" onSubmit={handleEditSubmit}>
          <label htmlFor="categoryName" className="name_category">Tên Danh Mục</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            placeholder="Nhập tên danh mục"
            value={categoryInfo.name}
            onChange={handleChangeName}
          />

          <label htmlFor="categoryImage" className="custom-file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            {imagePreview ? "Ảnh đã chọn" : "Upload file"}
          </label>
          <input
            type="file"
            id="categoryImage"
            name="categoryImage"
            accept="image/*"
            onChange={handleFileChange}
          />

          {imagePreview ? (
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginBottom: "10px" }}
              />
            </div>
          ) : (
            categoryInfo.image && (
              <div>
                <img
                  src={import.meta.env.VITE_API_URL + "/uploads/" + categoryInfo.image}
                  alt="Current"
                  style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                />
              </div>
            )
          )}

          <button type="submit" className="btn-edit">Sửa</button>
        </form>
      </Modal>
    </>
  );
}

EditCategory.propTypes = {
  categoryItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onEditSuccess: PropTypes.func.isRequired
};

export default EditCategory;
