import Header from "./Header/header";
import Footer from "./Footer/footer";

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

export default DefaultLayout;