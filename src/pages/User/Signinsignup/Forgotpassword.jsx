import "./signUpSignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToastError("Vui lòng nhập email!")
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`, {
        email,
      });
      showToastSuccess("Email đặt lại mật khẩu đã được gửi.");
      navigate("/login-register");
    } catch (error) {
      // console.error("Lỗi khi yêu cầu đặt lại mật khẩu:", error);
      showToastError("Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.")
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="main_dlmk">
        <form>
          <div className="top_dlmk">
            <Link to="/login-register">
              <FaArrowLeftLong />
            </Link>
            <p className="name_dlmk">Đặt lại mật khẩu</p>
          </div>
          <div className="center_dlmk">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="bot_dlmk">
            <button onClick={handleForgotPassword}>
              {loading ? "Đang gửi..." : "Gửi email"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ForgotPassword;
