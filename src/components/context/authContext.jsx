import { createContext, useEffect, useState } from "react";
import AuthService from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "../../utils/http";
import { matchPath } from "react-router-dom"; // Import để kiểm tra match động

const UserContext = createContext(null);

const UserProvder = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const dataUserDefault = {
        isLoadding: true,
        isAuthenticated: false,
        access_token: "",
        account: {},
    };

    const [user, setUser] = useState(dataUserDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoadding: false });
        // Lưu thông tin vào localStorage
        localStorage.setItem("userInfo", JSON.stringify(userData));
    };

    const logoutContext = () => {
        setUser({ ...dataUserDefault, isLoadding: false });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("jwt");
        delete http.defaults.headers.common["Authorization"];
    };

    const fetchUser = async () => {
        let response = await AuthService.getOneUser();
        if (response && response.EC === 0) {
            let id = response.data.id;
            let full_name = response.data.full_name;
            let email = response.data.email;
            let avatar = response.data.avatar;
            let role = response.data.role;
            // let access_token = response.data.token;
            const dataUser = {
                isAuthenticated: true,
                // access_token: access_token,
                account: { id, full_name, email, avatar, role },
                isLoadding: false,
            };
            setTimeout(() => {
                setUser(dataUser);
            }, 1500);
        } else {
            setUser({ ...dataUserDefault, isLoadding: false });
            navigate("/login-register");
        }
    };

    const pathToNoCheck = [
        "/",
        "/allproduct",
        "/news",
        "/NewsDetail/:id",
        "/contact",
        "/login-register",
        "/forgotPassword",
        "/reset-password",
        "/search",
        "/productDetail/:id", // Cần kiểm tra động
    ];

    const isPathInNoCheck = (pathname) => {
        return pathToNoCheck.some((path) => matchPath({ path, end: true }, pathname));
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");

        if (location && location.pathname.startsWith("/reset-password")) {
            // Không cần xác thực, đặt trạng thái mặc định
            setUser({ ...dataUserDefault, isLoadding: false });
            return;
        }

        // Kiểm tra xem nếu người dùng đã đăng nhập (có thông tin trong localStorage)
        if (storedUser) {
            setUser({ ...JSON.parse(storedUser), isLoadding: false });
        } else {
            // Kiểm tra nếu không phải là các trang không cần xác thực người dùng
            if (location && !isPathInNoCheck(location.pathname)) {
                fetchUser();
            } else {
                setUser({ ...dataUserDefault, isLoadding: false });
            }
        }

        // Điều hướng nếu người dùng đã đăng nhập và đang cố truy cập /login-register
        if (storedUser && location.pathname === "/login-register") {
            navigate("/"); // Hoặc trang admin tùy thuộc vào yêu cầu
        }
    }, [location.pathname, navigate]); // Chỉ phụ thuộc vào location.pathname và navigate

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvder, UserContext };
