import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import "./edit.css";
import BrandService from "../../../services/brandService";
import { showToastSuccess } from "../../../config/toastConfig";
import CategoryService from "../../../services/categoryService";

function EditBrand({ brandItem, onEditSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState([]); // State để lưu danh sách các danh mục

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategory();
        if (response && response.data && response.data.length > 0) {
          setCategories(response.data); // Cập nhật danh mục vào state
        }
      } catch (error) {
        console.log("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []); // Chỉ chạy khi component được mount

  const [brandInfo, setBrandInfo] = useState({
    id: brandItem.id,
    name: brandItem.name || "",
    category_id: brandItem.category_id || null, // Thêm giá trị mặc định
    logo: brandItem.logo,
  });
  // console.log(brandInfo);
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditBrand = (item) => {
    setBrandInfo({
      id: brandItem.id,
      name: item.name || "",
      logo: item.logo || null,
      category_id: item.category_id || "",
    });
    setIsModalOpen(true);
  };



  const handleChangeName = (e) => {
    const { value } = e.target;
    setBrandInfo((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    // console.log(e);
    setBrandInfo((prev) => ({
      ...prev,
      category_id: +value,
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
      setBrandInfo({
        ...brandInfo,
        logo: file, // Đặt trực tiếp file vào `logo`
      });
    }
  };



  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const idBrand = brandInfo.id
    const formData = new FormData();
    formData.append('brandName', brandInfo.name);
    formData.append('category_id', brandInfo.category_id);
    formData.append('brandImage', brandInfo.logo);

    let data = await BrandService.putBrand(idBrand, formData);

    if (data && data.EC === 0) {
      showToastSuccess(data.message)
      setIsModalOpen(false);
      onEditSuccess(); // Gọi callback để cập nhật lại danh sách trong `CategoryAdmin`
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBrandInfo(brandItem);
    setImagePreview(null);
  };

  useEffect(() => {
    // console.log("Updated brandInfo:", brandInfo);
  }, [brandInfo]);

  return (
    <>
      <Button type="primary" onClick={() => handleEditBrand(brandItem)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>
      <Modal
        title="Sửa Thương Hiệu"
        className="modal-edit"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
        getContainer={false}
      >
        <form className="form-edit-brand" onSubmit={handleEditSubmit}>
          <label htmlFor="brandName" className="name_brand">Tên Thương Hiệu</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Nhập tên thương hiệu"
            value={brandInfo.name}
            onChange={handleChangeName}
          />

          <div className="form-group" style={{ width: '100%' }}>
            <label htmlFor="idCategory" style={{ fontWeight: 'normal', color: "#555555" }}>Danh mục:</label>
            <select
              id="idCategory"
              name="idCategory"
              value={brandInfo.category_id}
              onChange={handleChangeCategory}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category_id) => (
                <option key={category_id.id} value={category_id.id}>
                  {category_id.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="brandImage" className="custom-file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            {imagePreview ? "Ảnh đã chọn" : "Upload file"}
          </label>
          <input
            type="file"
            id="brandImage"
            name="brandImage"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
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
            brandInfo.logo && (
              <div>
                <img
                  src={import.meta.env.VITE_API_URL + "/uploads/" + brandInfo.logo}
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

EditBrand.propTypes = {
  brandItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired,
  onEditSuccess: PropTypes.func.isRequired
};

export default EditBrand;
