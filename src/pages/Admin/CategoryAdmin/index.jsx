import { Table, Button, Modal } from "antd";
import EditCategory from "./EditCategory";
import "./edit.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/categoryService";
import { formatDate } from "../../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";

function CategoryAdmin() {
  const [listCategory, setListCategory] = useState([]);

  //DELETE
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false); // Modal xóa
  const [categoryId, setCategoryId] = useState(null); // Lưu ID của mục được chọn xóa

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const dataCategory = await CategoryService.getAllCategory();
      if (dataCategory && dataCategory.data && dataCategory.EC === 0) {
        const formatData = dataCategory.data.map((cate, index) => ({
          ...cate,
          key: cate.id,
          index: index + 1,
          image: cate.image,
        }));
        setListCategory(formatData);
      }
    } catch (error) {
      console.error(error);
      showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
    }
  };

  const handleDelete = async () => {
    try {
      if (categoryId) {
        const category = await CategoryService.deleteCategory(categoryId);

        if (category && category.EC === 0) {
          showToastSuccess(category.message);
          await fetchCategory();
          setModalDeleteOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          src={import.meta.env.VITE_API_URL + "/uploads/" + image}
          alt="Category"
          style={{ width: "80px", height: "80px" }}
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
          <EditCategory
            categoryItem={{
              id: record.id,
              name: record.name,
              image: record.image,
            }}
            onEditSuccess={fetchCategory} // Truyền hàm callback để làm mới danh sách
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
            open={modalDeleteOpen && categoryId === record.id} // Mở modal chỉ khi ID trùng với mục đang chọn
            onOk={handleDelete}
            okText="Xóa"
            okButtonProps={{ className: "custom-ok-button" }} // Tùy chỉnh nút OK
            onCancel={() => setModalDeleteOpen(false)} // Đóng modal khi nhấn Hủy
            cancelText="Hủy"
            getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
          >
            <p>
              Bạn muốn xóa danh mục: <b>{record.name}</b>
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
          <Link to="/admin/add-category">Thêm danh mục</Link>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listCategory}
        pagination={{
          pageSize: 10, // Số lượng sản phẩm hiển thị trên mỗi trang
        }}
        style={{textAlign: 'center'}}
      />
    </>
  );
}

export default CategoryAdmin;