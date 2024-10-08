import "./signUpSignIn.css"
import { useState } from 'react'
import clsx from 'clsx';
import logo from "/Logo.png"
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function SignupSignin() {
    const [active, setActive] = useState(false)

    return (

        <div className={clsx('container', active && 'active')} id="container" >
            <div className="form-container sign-up ">
                <form>
                    <h2>Tạo tài khoản</h2>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <input type="text" placeholder="Tên đăng nhập " />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Mật khẩu" />
                    <input type="password" placeholder="Nhập lại mật khẩu" />

                    <button>Đăng ký</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h2>Đăng nhập</h2>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <input type="email" placeholder="Tên đăng nhập" />
                    <input type="password" placeholder="Mật khẩu" />
                    <Link to='/forgotPassword' >Quên mật khẩu!</Link>
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <img src={logo} alt="" width="100px" height="auto" />
                        <h2>Chào mừng bạn trở lại !</h2>
                        <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                        <button className="hidden" id="login" onClick={() => setActive(false)}>Đăng nhập</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <img src={logo} alt="" width="100px" height="auto" />
                        <h2>Chào mừng bạn đến với Four Tech</h2>
                        <p>Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                        <button className="hidden" id="register" onClick={() => setActive(true)}>Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignupSignin