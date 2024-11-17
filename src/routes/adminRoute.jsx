import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/context/authContext";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import { showToastError } from "../config/toastConfig";

function AdminRoute({ children }) {
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

    if (user.isAuthenticated && user.account.role !== 'admin') {
        showToastError("Bạn không có quyền truy cập vào trang này!")
        return (
            <Navigate to="/" replace />
        );
    }
    return children;
}

export default AdminRoute;
