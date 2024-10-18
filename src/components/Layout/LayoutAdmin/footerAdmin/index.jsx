import { Layout  } from "antd";

const {  Footer } = Layout;

function FooterAdmin() {
    return ( 
        <>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          admin four Teach ©{new Date().getFullYear()} Created by fpt polytechnic
        </Footer>
        </>
     );
}

export default FooterAdmin;