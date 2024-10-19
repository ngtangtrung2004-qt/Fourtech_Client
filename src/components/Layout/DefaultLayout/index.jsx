import Header from "./Header/header";
import Footer from "./Footer/footer";
import PropTypes from "prop-types";

function DefaultLayout({ children }) {
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