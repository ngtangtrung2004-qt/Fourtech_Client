import { useState } from "react";
import logo from "/Logo.png";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

import {
  DropboxOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  PieChartOutlined
} from "@ant-design/icons";
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
    <Link to="/admin/">Trang chủ</Link>,
    "1",
    <HomeOutlined />
  ),

  getItem(
    <Link to="/admin/brand-admin">Thương hiệu</Link>,
    "2",
    <ShopOutlined />
  ),

  getItem(
    <Link to="/admin/category-admin">Danh mục</Link>,
    "3",
    <UnorderedListOutlined />
  ),

  getItem(
    <Link to="/admin/product-admin">Sản phẩm</Link>,
    "4",
    <DropboxOutlined />
  ),

  getItem(
    <Link to="/admin/order-admin">Đặt hàng</Link>,
    "5",
    <ShoppingOutlined />
  ),

  getItem(
    <Link to="/admin/user-admin">Người dùng</Link>,
    "6",
    <PieChartOutlined />
  ),getItem(
    <Link to="/admin/contact-admin">Contact</Link>,
    "7",
    <PieChartOutlined />
  )
  // getItem(
  //   <Link to="/admin/brandAdmin">Brand</Link>,
  //   "6",
  //   <PieChartOutlined />
  // ),
  // menu phân cấp 
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "6"),
  //   getItem("Bill", "7"),
  //   getItem("Alex", "8"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "9"),
  //   getItem("Team 2", "10"),
  // ]),
  // getItem("Files", "11", <FileOutlined />),
]

function SiderAdmin() {

  const [collapsed, setCollapsed] = useState(false);
  return (<>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* <div className=''></div> */}
      <div className={`logo_admin ${collapsed ? "collapsed" : ""}`}>
        <img src={logo} alt="logo" />
        {!collapsed && <span>ADMIN</span>}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  </>);
}

export default SiderAdmin;