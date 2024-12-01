import { useEffect, useState } from "react";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";
import { formatDate } from "../../../config/config";
import { Button, Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Comment() {
  const [listComment, setlistComment] = useState([]);
  const [loading, setLoading] = useState(false); // Trạng thái khi đang xóa liên hệ
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const dataComment = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`);
      const data = await dataComment.json()

      const formatData = data.map((cmt, index) => ({
        ...cmt,
        key: cmt.id,
        index: index + 1,
        user: cmt.userData.full_name,
        product: cmt.productData.name,
        rating: cmt.rating,
        content: cmt.content
      }));
      setlistComment(formatData);
    } catch (error) {
      console.error(error);
      showToastError("Lỗi hệ thống. Vui lòng thử lại sau!")
    }
  };

  const handleDeleteComment = async (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa bình luận  này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/comment/${id}`);
          showToastSuccess("Xóa bình luận thành công!");
          // Cập nhật lại danh sách sau khi xóa
          await fetchComments();
        } catch (error) {
          console.error("Lỗi khi xóa bình luận:", error);
          showToastError("Xóa bình luận thất bại!");
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
      title: "Tên Người dùng",
      dataIndex: "user",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
    },
    {
      title: "Số sao",
      dataIndex: "rating",
    },

    {
      title: "Nội dung",
      dataIndex: "content",
    },
    {
      title: "Ngày thêm",
      dataIndex: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Thao tác",
      render: (text, record) => (
        <>
          <span>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteComment(record.id)}
              loading={loading} // Hiển thị trạng thái loading khi xóa
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </span>
        </>
      ),
    },
  ];
  return (
    <>
      {listComment.length > 0 ?
        (
          <Table
            columns={columns}
            dataSource={listComment}
            pagination={{
              pageSize: 10, // Số lượng sản phẩm hiển thị trên mỗi trang
            }}
            style={{ textAlign: 'center' }}
          />
        )
        :
        (
          <p style={{ fontWeight: 'bold' }}>Hiện không có bình luận nào ...</p>
        )
      }
    </>
  );
}

export default Comment;