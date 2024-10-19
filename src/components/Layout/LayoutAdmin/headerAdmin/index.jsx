// import React from "react";
import { Badge, Space, Input, Avatar, Layout } from "antd";
import {
  UserOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";
// import PropTypes from "prop-types";

const { Search } = Input;
const { Header } = Layout;

function HeaderAdmin() {

  return (
    <Header
      style={{
        padding: "0 10px",
        background: "#fff",
      }}
    >
      <div className="header-search">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          style={{ width: "25%" }}
        />
        
        <div className="notification-container">
          <Space size="middle">
            <Badge size="default" count={5}>
              <BellOutlined style={{ fontSize: "24px", color: "#000" }} />
            </Badge>
            <Badge size="default" count={5}>
              <MailOutlined style={{ fontSize: "24px", color: "#000" }} />
            </Badge>
          </Space>

          {/* Tên Admin */}
           <span
                style={{
                  marginRight: "10px",
                  marginLeft: "30px",
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Admin
              </span>

          {/* Avatar Admin */}
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
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
