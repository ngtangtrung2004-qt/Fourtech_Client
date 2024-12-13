import { Table, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import AuthService from "../../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../config/config";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";
import "./user.css"

function UserAdmin() {
  const [listUser, setListUser] = useState([])
  const [userDetail, setUserDetail] = useState({})
  // const [role, setRole] = useState()
  const [openModalEdit, setOpenModalEdit] = useState(false)

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

  const handleEdit = async (userId) => {
    setOpenModalEdit(true)

    let dataUser = await AuthService.getOneUser(userId);

    if (dataUser && dataUser.data && dataUser.EC === 0) {
      setUserDetail(dataUser.data)
    }
  }

  const handleCancel = () => {
    setOpenModalEdit(false)
  }

  const handleOkEdit = async () => {
    try {
      const updateUserRole = await AuthService.updateUserRole(userDetail.id, { role: userDetail.role })
      if (updateUserRole?.EC === 0) {
        showToastSuccess("Cập nhật thành công")
        fetchUser()
        setOpenModalEdit(false)
      }
    } catch (error) {
      // console.log(error);
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
    {
      title: "Chức vụ",
      dataIndex: 'role',
      render: (text) => {
        if (text === 'user') {
          return <p>Người dùng</p>
        } else if (text === 'admin') {
          return <p>Quản lý</p>
        }
      }
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
          <Button type="primary"
            onClick={() => handleEdit(record.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Modal
            title="Chỉnh sửa chức vụ"
            open={openModalEdit}
            okText='Cập nhật'
            onOk={() => handleOkEdit()}
            onCancel={handleCancel}
            centered
          >
            <div className='form-edit-user'>
              <div className="form-edit-user-item">
                <p><b>Họ và tên:</b> {userDetail.full_name} </p>
              </div>
              <div className="form-edit-user-item">
                <p><b>Số điện thoại:</b> {userDetail.phone} </p>
              </div>
              <div className="form-edit-user-item">
                <p><b>Email:</b> {userDetail.email} </p>
              </div>
              <div className="form-edit-user-item">
                <label htmlFor="role"><b>Chức vụ:</b></label>
                <select
                  name="role"
                  id="role"
                  defaultValue={userDetail.role} // Sử dụng defaultValue cho giá trị ban đầu
                  onChange={(e) => setUserDetail({ ...userDetail, role: e.target.value })}
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản lý</option>
                </select>
              </div>
            </div>
          </Modal>

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
