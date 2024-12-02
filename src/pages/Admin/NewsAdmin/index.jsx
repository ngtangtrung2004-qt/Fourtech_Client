import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../config/config";
import { Button, Modal, Table, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import './newsAdmin.css'
import axios from "axios";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";

function NewsAdmin() {
  const navigate = useNavigate()

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false); // Trạng thái khi đang xóa liên hệ



  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const dataNews = await axios.get(`${import.meta.env.VITE_API_URL}/api/news`);
      const formatData = dataNews.data.map((data, index) => ({
        ...data,
        key: data.id || index,
        index: index + 1,
        title: data.title || "Không có tiêu đề",
        content: data.content || "",
        image: data.image || null,
      }));
      setNews(formatData);

    } catch (error) {
      console.error(error);
    }
  };


  const handleEdit = (idProduct) => {
    navigate(`/admin/edit-news/${idProduct}`)
  }


  const handleDeleteNews = async (id) => {
    const token = localStorage.getItem("jwt"); // Lấy token từ localStorage
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa Tin tức  này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/news/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
              },
            }
          );

          showToastSuccess("Xóa Tin tức thành công!");
          // Cập nhật lại danh sách sau khi xóa
          await fetchNews();
        } catch (error) {
          console.error("Lỗi khi xóa Tin tức:", error);
          showToastError("Xóa Tin tức thất bại!");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (text) => {
        const maxLength = 40;
        if (text && text.length > maxLength) {
          return (
            <span title={text}>
              {text.slice(0, maxLength) + "..."}
            </span>
          );
        }
        return <span title={text}>{text}</span>;
      }
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
      title: "Nội dung",
      dataIndex: "content",
      render: (text) => {
        const maxLength = 50;
        const contentPreview = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

        return (
          <Tooltip
            title={<div dangerouslySetInnerHTML={{ __html: text }} />} // Nội dung đầy đủ trong Tooltip
            overlayStyle={{ maxWidth: "500px", wordWrap: "break-word" }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: contentPreview, // Hiển thị bản tóm tắt trong bảng
              }}
            />
          </Tooltip>
        );
      }
    },
    {
      title: "Ngày thêm",
      dataIndex: "createdAt",
      render: (text) => formatDate(text)
    },
    {
      title: "Thao tác",
      render: (text, record) => (
        <span className="action-product">
          <Button type="primary"
            onClick={() => handleEdit(record.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => handleDeleteNews(record.id)}
            loading={loading} // Hiển thị trạng thái loading khi xóa
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>

          {/* <Modal
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
          </Modal> */}

        </span>
      ),
    },
  ];

  return (
    <>
      <div className="add-product">
        <Button type="primary">
          <Link to="/admin/add-new">Thêm Tin tức</Link>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={news}
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
}

export default NewsAdmin;