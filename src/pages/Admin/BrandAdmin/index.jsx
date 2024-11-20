import { Table, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import BrandService from "../../../services/brandService";
import { useEffect, useState } from "react";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";
import './edit.css'
import { formatDate } from "../../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditBrand from "./EditBrand";

function Brand() {

  const [listBrand, setListBrand] = useState([]);

  //DELETE
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false); // Modal xóa
  const [brandId, setCategoryId] = useState(null); // Lưu ID của mục được chọn xóa

  useEffect(() => {
    fetchBrand()
  }, [])


  const fetchBrand = async () => {
    const dataBrand = await BrandService.getAllBrand();
    try {
      if (dataBrand && dataBrand.data && dataBrand.EC === 0) {
        const formatData = dataBrand.data.map((brand, index) => ({
          ...brand,
          key: brand.id,
          index: index + 1,
          image: brand.logo,
        }))
        setListBrand(formatData)
      }
    } catch (error) {
      console.log(error);
      showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
    }
  }

  const handleDelete = async () => {
    try {
      if (brandId) {
        const brand = await BrandService.deleteBrand(brandId);

        switch (brand && brand.EC) {
          case 1:
            showToastError(brand.message);
            break;

          case 0:
            showToastSuccess(brand.message);
            await fetchBrand();
            setModalDeleteOpen(false);
            break;

          case -1:
            showToastError("Lỗi hệ thống. Vui lòng thử lại sau.");
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
      showToastError("Lỗi hệ thống. Vui lòng thử lại sau.");
    }
  };



  const columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          src={import.meta.env.VITE_API_URL + "/uploads/" + image}
          alt="brand"
          style={{ width: "100px", height: "50px" }}
        />
      ),
    },
    {
      title: "Ngày thêm",
      dataIndex: "created_at",
      render: (text) => formatDate(text),
    },
    {
      title: "Thao tác",
      render: (text, record) => (
        <span className="action-product">
          <EditBrand
            brandItem={{
              id: record.id,
              name: record.name,
              logo: record.logo
            }}
            onEditSuccess={fetchBrand} // Truyền hàm callback để làm mới danh sách
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              setCategoryId(record.id); // Lưu ID danh mục để xóa
              setModalDeleteOpen(true); // Mở modal xác nhận xóa
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Modal
            title="Xác nhận xóa!"
            centered
            open={modalDeleteOpen && brandId === record.id} // Mở modal chỉ khi ID trùng với mục đang chọn
            onOk={handleDelete}
            okText="Xóa"
            okButtonProps={{ className: "custom-ok-button" }} // Tùy chỉnh nút OK
            onCancel={() => setModalDeleteOpen(false)} // Đóng modal khi nhấn Hủy
            cancelText="Hủy"
            getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
          >
            <p>
              Bạn muốn xóa thương hiệu: <b>{record.name}</b>
            </p>
          </Modal>
        </span>
      ),
    },
  ];
  return (
    <>
      <div className="add-product">
        <Button type="primary">
          <Link to="/admin/add-brand">Thêm Thương hiệu</Link>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listBrand}
        pagination={{
          pageSize: 10
        }}
      />
    </>
  );
}

export default Brand;
