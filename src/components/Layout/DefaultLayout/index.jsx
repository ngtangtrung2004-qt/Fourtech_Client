import Header from "./Header/header";
import Footer from "./Footer/footer";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../../context/authContext";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons'

function DefaultLayout({ children }) {
    const { user } = useContext(UserContext);

    if (user.isLoadding) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
            </div>
        )
    }
    return (
        <>
            <Header />
            <div className="Noi-dung-layout">
                {children}
            </div>
            <Footer />
        </>);
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;