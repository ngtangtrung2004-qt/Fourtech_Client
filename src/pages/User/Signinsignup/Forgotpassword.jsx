import "./signUpSignIn.css";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Vui lòng nhập email!");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forgot-password`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("Email đặt lại mật khẩu đã được gửi.");
    } catch (error) {
      console.error("Lỗi khi yêu cầu đặt lại mật khẩu:", error);
      alert(
        error.response?.data?.message ||
          "Đã xảy ra lỗi khi yêu cầu đặt lại mật khẩu."
      );
    }
  };
  console.log(email);
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
            <button onClick={handleForgotPassword}>Tiếp Theo</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ForgotPassword;
