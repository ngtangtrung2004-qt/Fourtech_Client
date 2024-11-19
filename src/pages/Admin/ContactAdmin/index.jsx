import { Button, Table, Modal, message } from "antd"; // Thêm Modal và message
import { useState, useEffect } from "react";
import ReplyContact from "./replyModel";
import { formatDate } from "../../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ContactAdmin() {
  const [dataContact, setDataContact] = useState([]);
  const [loading, setLoading] = useState(false); // Trạng thái khi đang xóa liên hệ

  // Lấy danh sách liên hệ từ API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`);
        const data = await res.json();
        const formatData = data.map((ct, index) => ({
          key: index + 1,
          id: ct.id,
          UserContact: ct.UserContact,
          EmailContact: ct.EmailContact,
          PhoneContact: ct.PhoneContact,
          messageContact: ct.messageContact,
          createdAt: ct.createdAt,
        }));
        setDataContact(formatData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách liên hệ:", error);
      }
    };
    fetchContacts();
  }, []);
console.log('data',dataContact)
  // Hàm xóa liên hệ
  const handleDeleteContact = async (id) => {
    console.log(id)
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa liên hệ này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/contact/${id}`);
          message.success("Xóa liên hệ thành công!");
          // Cập nhật lại danh sách sau khi xóa
          setDataContact(dataContact.filter((contact) => contact.id !== id));
        } catch (error) {
          console.error("Lỗi khi xóa liên hệ:", error);
          message.error("Xóa liên hệ thất bại!");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Cột cho bảng danh sách liên hệ
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "UserContact",
      dataIndex: "UserContact",
    },
    {
      title: "EmailContact",
      dataIndex: "EmailContact",
    },
    {
      title: "PhoneContact",
      dataIndex: "PhoneContact",
    },
    {
      title: "Message",
      dataIndex: "messageContact",
    },
    {
      title: "DateContact",
      dataIndex: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <span>
            <ReplyContact EmailContact={record.EmailContact}></ReplyContact>
          </span>
          <span>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteContact(record.id)}
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
      <div className="add-product"></div>
      <Table columns={columns} dataSource={dataContact} pagination={false} />
    </>
  );
}

export default ContactAdmin;
