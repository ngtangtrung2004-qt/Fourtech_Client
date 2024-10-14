import"./signUpSignIn.css"
import  { useState } from 'react'
import clsx from 'clsx';
import logo from "../../../../public/Logo.png"
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const SignupSignin = () =>{
    const [active, setActive] = useState(false)
    const [formData, setFormData] = useState({
        usename: '', email: '', password: '', confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.usename.trim()) validationErrors.usename = 'Tên người dùng bắt buộc!';
        if (!formData.email.trim()) validationErrors.email = 'Email bắt buộc!';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Email không hợp lệ!';
        if (!formData.password) validationErrors.password = 'Mật khẩu bắt buộc!';
        else if (formData.password.length < 8) validationErrors.password = 'Mật khẩu phải trên 8 ký tự!';
        if (formData.confirmPassword !== formData.password) validationErrors.confirmPassword = 'Mật khẩu không khớp!';
        
        setErrors(validationErrors);
        if (!Object.keys(validationErrors).length) alert('Đăng ký thành công!');
    };
    return(
        
        <div className={clsx('container',active && 'active')} id="container" >
            <div className="form-container sign-up ">
                <form onSubmit={handleSubmit}>
                    <h2>Tạo tài khoản</h2> 

                    <input type="text" name="usename" placeholder="Tên đăng nhập"                        
                     onChange={handleChange} />
                     {errors.usename && <span>{errors.usename}</span>}

                     <input type="text" name="email"
                     placeholder="Địa chỉ email"
                     onChange={handleChange}/>
                     {errors.email && <span>{errors.email}</span>}
                    
                      <input type="Password" name="password" 
                     placeholder="Mật khẩu"
                     onChange={handleChange}/>
                     {errors.password && <span>{errors.password}</span>}
                     
                     <input type="Password" name="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      onChange={handleChange}/>
                     {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                    <button type="submit">Đăng ký</button>
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
                    <input type="text" name="usename" placeholder="Tên đăng nhập"
                     onChange={handleChange} />
                     {errors.Usename && <span>{errors.Usename}</span>}
                    <input type="Password" name="password" placeholder="Mật khẩu"
                     onChange={handleChange}/>
                    {errors.Password && <span>{errors.Password}</span>}
                    <Link to='/forgotPassword' >Quên mật khẩu!</Link>
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <img src={logo} alt="" width="100px" height="auto"/>
                        <h2>Chào mừng bạn trở lại !</h2>
                        <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                        <button className="hidden" id="login" onClick={()=>setActive(false)}>Đăng nhập</button>
                    </div>
                    <div className="toggle-panel toggle-right"> 
                        <img src={logo} alt="" width="100px" height="auto"/>
                        <h2>Chào mừng bạn đến với Four Tech</h2>
                        <p>Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                        <button className="hidden" id="register" onClick={()=>setActive(true)}>Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default SignupSignin