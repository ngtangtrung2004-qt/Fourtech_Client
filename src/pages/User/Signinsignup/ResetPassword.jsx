import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./signUpSignIn.css";

function ResetPassword() {
 const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useParams(); // Lấy token từ URL
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không khớp.');
      return;
    }
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/reset-password`, { token, newPassword });
      alert('Mật khẩu đã được đặt lại thành công.');
      navigate('/login-register'); // Điều hướng người dùng đến trang đăng nhập
    } catch (error) {
      console.error('Lỗi khi đặt lại mật khẩu:', error);
      alert('Token không hợp lệ hoặc đã hết hạn.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="main_reset_password">
      <div className="reset_password">
        <div className="titele_reset_password">
          <Link to='/login-register'>
                    <FaArrowLeftLong/>
                    </Link>
          <h2>Đặt lại mật khẩu</h2>
        </div>
        <div className="reset_password_input">
          <p>Nhập mật khẩu mới</p>
          <input
            className="reset_password_input-newpw"
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="reset_password_input">
          <p>Nhập lại mật khẩu</p>
          <input
            className="reset_password_input-newpw"
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="resset-password-btn" onClick={handleResetPassword}>{loading ? "Đang đặt lại mật khẩu..." : "Đổi mật khẩu"}</button>
      </div>
    </div>
  );
}

export default ResetPassword;
