import { useEffect, useState } from "react";
import { Table, Button, Modal, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./product.css";
import ProductService from "../../../services/productService";
import { formatCurrency, formatDate } from "../../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { showToastSuccess } from "../../../config/toastConfig";

function ProductAdmin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  //DELETE
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false); // Modal xóa
  const [productId, setProductId] = useState(null); // Lưu ID của mục được chọn xóa

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const dataProduct = await ProductService.getAllProduct();

      if (dataProduct && dataProduct.length > 0) {
        const formatData = dataProduct.map((pro, index) => ({
          ...pro,
          key: pro.id,
          index: index + 1,
          image: pro.image && Array.isArray(pro.image) ? pro.image : [],
        }));
        setProducts(formatData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (idProduct) => {
    navigate(`/admin/edit-product/${idProduct}`);
  };

  const handleDelete = async () => {
    try {
      if (productId) {
        const product = await ProductService.deleteSoftProduct(productId);

        if (product && product.EC === 0) {
          showToastSuccess(product.message);
          await fetchProducts();
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => {
        const maxLength = 40;
        if (text && text.length > maxLength) {
          return <span title={text}>{text.slice(0, maxLength) + "..."}</span>;
        }
        return <span title={text}>{text}</span>;
      },
    },
    {
      title: "Danh mục",
      dataIndex: "category_name",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand_name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (images) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {images.slice(0, 2).map((src, index) => (
              <img
                key={index}
                src={import.meta.env.VITE_API_URL + "/uploads/" + src}
                alt={`Product ${index + 1}`}
                title={src}
                style={{ width: "50px", height: "50px" }}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "promotion_price",
      render: (text) => {
        if (text === 0) {
          return <p>Không có giá khuyến mãi</p>;
        } else {
          return <p>{formatCurrency(text)}</p>;
        }
      },
    },
    {
  title: "Nội dung",
  dataIndex: "description",
  render: (text) => {
    const maxLength = 50;
    const descriptionPreview = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
      <Tooltip
        title={<div dangerouslySetInnerHTML={{ __html: text }} />} // Nội dung đầy đủ trong Tooltip
        overlayStyle={{ maxWidth: "500px", wordWrap: "break-word" }} 
      >
        <div
          dangerouslySetInnerHTML={{
            __html: descriptionPreview, // Hiển thị bản tóm tắt trong bảng
          }}
        />
      </Tooltip>
    );
  },
},
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
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
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => {
              setProductId(record.id); // Lưu ID danh mục để xóa
              setModalDeleteOpen(true); // Mở modal xác nhận xóa
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>

          <Modal
            title="Xác nhận xóa!"
            centered
            open={modalDeleteOpen && productId === record.id} // Mở modal chỉ khi ID trùng với mục đang chọn
            onOk={handleDelete}
            okText="Xóa"
            okButtonProps={{ className: "custom-ok-button" }} // Tùy chỉnh nút OK
            onCancel={() => setModalDeleteOpen(false)} // Đóng modal khi nhấn Hủy
            cancelText="Hủy"
            getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
          >
            <p>
              Bạn muốn xóa sản phẩm: <b>{record.name}</b>
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
          <Link to="/admin/add-product">Thêm Sản Phẩm</Link>
        </Button>
        <Button type="primary" danger>
          <Link to="/admin/trash-can-product">Thùng rác</Link>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          pageSize: 10,
        }}
      />
    </>
  );
}

export default ProductAdmin;
