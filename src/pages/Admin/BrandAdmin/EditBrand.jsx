import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import "./edit.css";
import BrandService from "../../../services/brandService";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";

function EditBrand({ brandItem, onEditSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [brandInfo, setBrandInfo] = useState({
    id: brandItem.id,
    name: brandItem.name || "",
    logo: brandItem.logo,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditBrand = (item) => {
    setBrandInfo({
      id: brandItem.id,
      name: item.name || "",
      logo: item.logo || null,
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

    // Gửi yêu cầu cập nhật danh mục
    try {
      const idBrand = brandInfo.id
      const formData = new FormData();
      formData.append('brandName', brandInfo.name);
      formData.append('brandImage', brandInfo.logo);

      let data = await BrandService.putBrand(idBrand, formData);

      switch (data && data.EC) {
        case 1:
          showToastError(data.message)
          break;
        case 0:
          showToastSuccess(data.message)
          setIsModalOpen(false);
          onEditSuccess(); // Gọi callback để cập nhật lại danh sách trong `CategoryAdmin`
          break;
        case -1:
          showToastError('Lỗi hệ thống. Vui lòng thử lại sau!')
          break;

        default:
          break;
      }

    } catch (error) {
      console.error("Lỗi khi cập nhật thương hiệu.", error);
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
    logo: PropTypes.string.isRequired
  }).isRequired,
  onEditSuccess: PropTypes.func.isRequired
};

export default EditBrand;