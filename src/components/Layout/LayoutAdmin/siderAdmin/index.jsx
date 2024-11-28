import { useState } from "react";
import { useLocation } from "react-router-dom"; // Dùng để lấy URL hiện tại
import logo from "/Logo.png";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DropboxOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  CommentOutlined,
  UserOutlined,
  ContactsOutlined,
  AuditOutlined,
  AppstoreOutlined,

} from "@ant-design/icons";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link to="/admin/">Tổng quan</Link>,
    "/admin/",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/admin/brand-admin">Thương hiệu</Link>,
    "/admin/brand-admin",
    <ShopOutlined />
  ),
  getItem(
    <Link to="/admin/category-admin">Danh mục</Link>,
    "/admin/category-admin",
    <UnorderedListOutlined />
  ),
  getItem(
    <Link to="/admin/product-admin">Sản phẩm</Link>,
    "/admin/product-admin",
    <DropboxOutlined />
  ),
  getItem(
    <Link to="/admin/order-admin">Đơn hàng</Link>,
    "/admin/order-admin",
    <ShoppingOutlined />
  ),
  getItem(
    <Link to="/admin/comment-admin">Bình Luận</Link>,
    "/admin/comment-admin",
    <CommentOutlined />
  ),
  getItem(
    <Link to="/admin/contact-admin">Liên hệ</Link>,
    "/admin/contact-admin",
    <ContactsOutlined />
  ),
  getItem(
    <Link to="/admin/user-admin">Người dùng</Link>,
    "/admin/user-admin",
    <UserOutlined />
  ),
   getItem(
    <Link to="/admin/news-admin">Bản tin</Link>,
    "/admin/news-admin",
    <AuditOutlined />
  ),
]

function SiderAdmin() {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={`logo_admin ${collapsed ? "collapsed" : ""}`}>
        <img src={logo} alt="logo" />
        {!collapsed && <span>ADMIN</span>}
      </div>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]} // Đồng bộ với URL hiện tại
        mode="inline"
        items={items}
      />
    </Sider>
  );
}

export default SiderAdmin;