import logo from "/Logo.png";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <header className="header">
                <div className="header-left">
                    <Link to={''}>
                        <img src={logo} style={{ height: 70, width: 70 }} alt="" />
                    </Link>
                </div>

                <div className="header-right">
                    <nav className="nav">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to={""}>Trang chủ</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={""}>Sản phẩm
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                                    <div className="sub-nav">
                                        <ul className="sub-nav-list">
                                            <li className="sub-nav-item">
                                                <Link>Bàn phím</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Laptop</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Màn hình</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Chuột + Lót chuột</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Máy chơi game</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Sạc dự phòng</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={""}>Khám phá</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={""}>Bài viết</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={""}>Liên hệ</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="search">
                        <input type="text" placeholder="Bạn muốn tìm gì?" />
                        <div className="icon-search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className="cart">
                        <div className="icon-cart">
                            <Link to={""}>
                                <FontAwesomeIcon icon="fa-cart-shopping" />
                                <div className="text-gio-hang">
                                    <div className="arrow-up"></div>
                                    <p>Giỏ hàng</p>
                                </div>
                            </Link>
                            <div className="soluong">
                                <span>0</span>
                            </div>
                        </div>
                    </div>

                    <div className="account">
                        <div className="icon-user">
                            <Link to={"/signin"}>
                                <FontAwesomeIcon icon="fa-circle-user" />
                                <div className="text-dang-nhap">
                                    <div className="arrow-up"></div>
                                    <p>Đăng nhập</p>
                                </div>
                            </Link>
                        </div>

                        {/* Phần này là để đăng nhập hiển thị người dùng */}
                        {/* <div className="user">
                            <img src="../../../../src/assets/images/avatar-mac-dinh.png" style={{ height: 30, width: 30 }} alt="" />
                            <p style={{marginLeft:5, fontWeight:"bold"}}>Tiến Đạt</p>
                            <div className="sub-user">
                                <ul>
                                    <li>
                                        <Link to={''}>
                                            <FontAwesomeIcon icon="fa-regular fa-id-badge" fixedWidth />
                                            <p>Hồ sơ</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={''}>
                                            <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" fixedWidth />
                                            <p>Đăng xuất</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </header >
        </>
    );
}

export default Header;
