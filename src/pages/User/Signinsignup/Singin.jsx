import "./signUpSignIn.css"
import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';
import logo from "/Logo.png"
import { Link } from "react-router-dom";
import { showToastSuccess } from "../../../config/toastConfig";
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../../../services/authService";
import { UserContext } from "../../../components/context/authContext";



const SignupSignin = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)

    const { loginContext } = useContext(UserContext)


    const [formRegister, setFormRegister] = useState({
        full_nameRegister: "",
        emailRegister: "",
        phoneRegister: "",
        passwordRegister: "",
        confirmPasswordRegister: ""
    })

    const [formLogin, setFormLogin] = useState({
        valueLogin: "",
        passwordLogin: ""
    })

    const [errorRegister, setErrorRegister] = useState({})
    const [errorLogin, setErrorLogin] = useState({})


    //Register
    const onChangeHandleRegister = (e) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value })
    }

    //Bắt sự kiện nhấn nút Enter khi đăng ký
    const handlePressEnterRegister = (e) => {
        if (e.charCode === 13 && e.code === "Enter") {
            handleSubmitRegister(e)
        }
    }

    //Nhấn button Đăng Ký
    const handleSubmitRegister = async (e) => {
        e.preventDefault(); //Không cho reload lại trang
        const newError = {};
        if (!formRegister.full_nameRegister.trim()) {
            newError.full_nameRegister = "Họ và tên không được để trống!"
        } else if (formRegister.full_nameRegister.length > 30) {
            newError.full_nameRegister = "Họ và tên chỉ được tối đa 30 ký tự!"
        }

        if (!formRegister.emailRegister) {
            newError.emailRegister = "Email không được để trống"
        } else if (!/\S+@\S+\.\S+/.test(formRegister.emailRegister)) {
            newError.emailRegister = "Email không đúng định dạng!"
        }

        if (!formRegister.phoneRegister) {
            newError.phoneRegister = "Số điện thoại không được để trống"
        } else if (!/^[0-9]{3}[0-9]{4}[0-9]{3}$/.test(formRegister.phoneRegister)) {
            newError.phoneRegister = "Số điện thoại không đúng định dạng!"
        }

        if (!formRegister.passwordRegister) {
            newError.passwordRegister = "Mật khẩu không được để trống!"
        } else if (formRegister.passwordRegister.length < 3 || formRegister.passwordRegister.length > 16) {
            newError.passwordRegister = "Mật khẩu tối thiểu 3 ký tự và tối đa 16 ký tự!";
        }
        if (formRegister.passwordRegister != formRegister.confirmPasswordRegister) {
            newError.confirmPasswordRegister = "Mật khẩu không khớp!"
        }

        if (Object.keys(newError).length > 0) {
            setErrorRegister({ ...newError })
        } else {
            const dataRegister = await AuthService.Register(formRegister)

            if (dataRegister && dataRegister.EC === 0) {
                showToastSuccess(dataRegister.message)
                setActive(false)
            }
        }
    }



    //Login
    const onChangeHandleLogin = (e) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
    }

    //Bắt sự kiện Enter khi Đăng nhập
    const handlePressEnterLogin = (e) => {
        if (e.charCode === 13 && e.code === "Enter") {
            handlePressEnterLogin(e)
        }
    }

    //Ấn button Đăng nhập
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const newError = {}



        if (!formLogin.valueLogin.trim()) {
            newError.valueLogin = "Email hoặc số điện thoại không được để trống!"
        }

        if (!formLogin.passwordLogin) {
            newError.passwordLogin = "Mật khẩu không được để trống!"
        }

        if (Object.keys(newError).length > 0) {
            setErrorLogin({ ...newError })
        } else {
            const dataLogin = await AuthService.Login(formLogin)

            if (dataLogin && dataLogin.EC === 0) {
                let id = dataLogin?.data?.id
                let full_name = dataLogin?.data?.full_name
                let email = dataLogin?.data?.email
                let avatar = dataLogin?.data?.avatar
                let role = dataLogin?.data?.role
                const dataUser = {
                    isAuthenticated: true,
                    access_token: dataLogin.data.access_token,
                    account: { id, full_name, email, avatar, role }
                }
                console.log('check dataUser>>>', dataUser);
                localStorage.setItem('jwt', dataLogin.data.access_token)
                loginContext(dataUser)
                showToastSuccess(dataLogin.message)
                if (role === 'admin') {
                    console.log('admin');
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            }
        }
    }


    return (

        <div className={clsx('container-login-register', active && 'active')} id="container-login-register" >
            <div className="form-container sign-up ">
                <form className="form" onSubmit={handleSubmitRegister}>
                    <h2>Tạo tài khoản</h2>

                    <input
                        type="text"
                        name="full_nameRegister"
                        placeholder="Họ và tên"
                        value={formRegister.full_nameRegister}
                        onChange={onChangeHandleRegister}
                    />
                    {errorRegister.full_nameRegister && (<span className="spanError">{errorRegister.full_nameRegister}</span>)}

                    <input
                        type="email"
                        name="emailRegister"
                        placeholder="Địa chỉ email"
                        value={formRegister.emailRegister}
                        onChange={onChangeHandleRegister}
                    />
                    {errorRegister.emailRegister && (<span className="spanError">{errorRegister.emailRegister}</span>)}

                    <input
                        type="text"
                        name="phoneRegister"
                        placeholder="Số điện thoại"
                        value={formRegister.phoneRegister}
                        onChange={onChangeHandleRegister}
                    />
                    {errorRegister.phoneRegister && (<span className="spanError">{errorRegister.phoneRegister}</span>)}

                    <input
                        type="Password"
                        name="passwordRegister"
                        placeholder="Mật khẩu"
                        value={formRegister.passwordRegister}
                        onChange={onChangeHandleRegister}
                    />
                    {errorRegister.passwordRegister && (<span className="spanError">{errorRegister.passwordRegister}</span>)}

                    <input
                        type="Password"
                        name="confirmPasswordRegister"
                        placeholder="Nhập lại mật khẩu"
                        value={formRegister.confirmPasswordRegister}
                        onChange={onChangeHandleRegister}
                        onKeyPress={(event) => handlePressEnterRegister(event)}
                    />
                    {errorRegister.confirmPasswordRegister && (<span className="spanError">{errorRegister.confirmPasswordRegister}</span>)}

                    <button type="submit">
                        Đăng ký
                    </button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form className="form" onSubmit={handleSubmitLogin}>
                    <h2>Đăng nhập</h2>
                    {/* <div className="social-icons">
                        <Link to={''} className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </Link>
                        <Link to={''} className="icon">
                            <i className="fa-brands fa-facebook-f"></i></Link>
                        <Link to={''} className="icon"><i className="fa-brands fa-github"></i>
                        </Link>
                        <Link to={''} className="icon">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                    </div> */}

                    <input
                        type="text"
                        name="valueLogin"
                        placeholder="Email hoặc số điện thoại"
                        value={formLogin.valueLogin}
                        onChange={onChangeHandleLogin}
                    />
                    {errorLogin.valueLogin && (<span className="spanError">{errorLogin.valueLogin}</span>)}

                    <input
                        type="Password"
                        name="passwordLogin"
                        placeholder="Mật khẩu"
                        value={formLogin.passwordLogin}
                        onChange={onChangeHandleLogin}
                        onKeyPress={(event) => handlePressEnterLogin(event)}
                    />
                    {errorLogin.passwordLogin && (<span className="spanError">{errorLogin.passwordLogin}</span>)}

                    <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: '100%' }}>
                        <Link className="quen-mat-khau" to='/forgotPassword' >Quên mật khẩu!</Link>
                        {/* <div className="tro-ve-trang-chu">
                            <p>Trở về trang chủ <Link to='/' >Tại đây</Link></p>
                        </div> */}
                    </div>
                    <button type="submit">
                        Đăng nhập
                    </button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <img src={logo} alt="" width="100px" height="auto" />
                        <h2>Chào mừng bạn trở lại !</h2>
                        <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                        <button
                            className="hidden btn-dang-nhap"
                            id="login"
                            onClick={() => {
                                setActive(false)
                                setFormLogin({
                                    valueLogin: "",
                                    passwordLogin: ""
                                })
                                setErrorLogin("")
                            }}
                        >
                            Đăng nhập
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <img src={logo} alt="" width="100px" height="auto" />
                        <h2>Chào mừng bạn đến với Four Tech</h2>
                        <p>Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                        <button
                            className="hidden btn-dang-ky"
                            id="register"
                            onClick={() => {
                                setActive(true)
                                setFormRegister({
                                    full_nameRegister: "",
                                    emailRegister: "",
                                    phoneRegister: "",
                                    passwordRegister: "",
                                    confirmPasswordRegister: ""
                                })
                                setErrorRegister("")
                            }}
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignupSignin