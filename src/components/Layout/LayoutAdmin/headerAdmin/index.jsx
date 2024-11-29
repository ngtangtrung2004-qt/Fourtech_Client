
import { Dropdown,  Layout, Space } from "antd";
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { UserContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/authService";
import { showToastSuccess } from "../../../../config/toastConfig";

// const { Search } = Input;
const { Header } = Layout;

function HeaderAdmin() {

  const navigate = useNavigate()

  const { user, logoutContext } = useContext(UserContext)

  const handleLogout = async () => {
    let data = await AuthService.Logout() //clear cookie

    if (data && data.EC === 0) {
      logoutContext() //clear context
      showToastSuccess(data.message)
      navigate('/login-register')
    }
  }

  const items = [
    {
      key: '1',
      label: (
        <span onClick={() => navigate('/')}>
          Về trang bán hàng
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={() => handleLogout()} >
          Đăng xuất
        </span>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 10px",
        background: "#fff",
      }}
    >
      <div className="header-search">
        <div></div>
        {/* <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          style={{ width: "25%" }}
        /> */}

        {user && user.isAuthenticated === true ?
          <>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="notification-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={import.meta.env.VITE_API_URL + '/uploads/' + user.account.avatar} alt="" width='30px' height='30px' />
                    <span style={{ marginLeft: "10px", color: "#000", fontWeight: "700" }}>
                      {user.account.full_name}
                    </span>
                  </div>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

          </>
          :
          <>
            <div className="notification-container">
              <span style={{ marginLeft: "10px", color: "#000", fontWeight: "700", }}>
                Admin
              </span>
              {/* <Avatar size="large" icon={<UserOutlined />} /> */}
            </div>
          </>
        }

      </div>
    </Header>
  );
}

// Định nghĩa kiểu cho các props
// HeaderAdmin.propTypes = {
//   adminName: PropTypes.string,
//   notificationCount: PropTypes.number,
// };

export default HeaderAdmin;
