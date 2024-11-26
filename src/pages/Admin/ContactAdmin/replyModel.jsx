import { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";

function ReplyContact({ EmailContact }) {
  // Giải cấu trúc EmailContact từ props
  const [replyMessage, setReplyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReply = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/reply`, {
        email: EmailContact,
        message: replyMessage,
      });
      showToastSuccess("Gửi email trả lời thành công!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
      showToastError("Gửi email trả lời thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Trả lời
      </Button>
      <Modal
        title="Phản hồi"
        open={isModalOpen}
        onOk={handleReply}
        onCancel={handleCancel}
        okButtonProps={{ loading }} // Disable nút OK khi loading
        cancelButtonProps={{ disabled: loading }} // Disable nút Cancel khi loading
      >
        <textarea
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          placeholder="Nội dung trả lời"
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "vertical",
            fontSize: "16px",
          }}
          disabled={loading} // Không cho phép chỉnh sửa khi loading
        ></textarea>
      </Modal>
    </>
  );
}

// Thêm propTypes để kiểm tra EmailContact
ReplyContact.propTypes = {
  EmailContact: PropTypes.string.isRequired,
};

export default ReplyContact;
