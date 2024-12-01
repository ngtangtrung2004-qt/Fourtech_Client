import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import AuthService from "../../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../config/config";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";

function UserAdmin() {
  const [listUser, setListUser] = useState([])

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      let dataUser = await AuthService.getAllUser();

      if (dataUser && dataUser.data && dataUser.EC === 0) {
        const usersFormatData = dataUser.data.map((user, index) => ({
          ...user,
          key: user.id,
          index: index + 1
        }));
        setListUser(usersFormatData)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (userId) => {
    const user = await AuthService.deleteUser(userId)
    switch (user && user.EC) {
      case 1:
        showToastError(user.message)
        break;
      case 0:
        showToastSuccess(user.message)
        fetchUser()
        break;
      case -1:
        showToastError("Lỗi hệ thống!")
        break;

      default:
        break;
    }
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "address",
    // },
    {
      title: "Chức vụ",
      dataIndex: 'role'
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: 'created_at',
      render: (text) => formatDate(text)
    },
    {
      title: "Thao tác",
      render: (text, record) => (
        <span className="action-user">
          <Button type="primary" danger
            onClick={() => handleDelete(record.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={listUser}
        pagination={{
          pageSize: 10, // Số phần tử mỗi trang
        }}
        locale={{ emptyText: "Không có dữ liệu" }}
        rowKey="id" // Khóa duy nhất cho mỗi hàng, sử dụng id của từng user
      />
    </>
  );
}

export default UserAdmin;
