
import "./style.css";


import { Layout, theme } from "antd";
import PropTypes from "prop-types";

import FooterAdmin from "./footerAdmin";
import HeaderAdmin from "./headerAdmin";
import SiderAdmin from "./siderAdmin";




const { Content } = Layout;

const LayoutAdmin = ({ children }) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SiderAdmin />
      <Layout>
        <HeaderAdmin />
        <Content style={{margin: "10px 16px 0px"}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <FooterAdmin />
      </Layout>
    </Layout>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayoutAdmin;
