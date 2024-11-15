import logo from "/Logo.png";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import { CartContext } from "../../../CartContext/CartContext";

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [account,setAccount] = useState()
    const inputRef = useRef(null);
    const { cartQuantity } = useContext(CartContext);

    useEffect(() => {
        let jwt = sessionStorage.getItem('account')
        if(jwt) {
            setAccount(account)
        }
    }, [])

    useEffect(() => {
        const handelClickOutSide = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsSearchOpen(false)
            }
        }

        if (isSearchOpen) {
            document.addEventListener('mousedown', handelClickOutSide);
        } else {
            document.removeEventListener('mousedown', handelClickOutSide);
        }

        return () => {
            document.removeEventListener('mousedown', handelClickOutSide);
        }
    }, [isSearchOpen])




    return (
        <>
            <header className="container-header">
                <div className="header">
                    <div className="header-left">
                        <Link to={'/'}>
                            <img src={logo} style={{ height: 70, width: 70 }} alt="" />
                        </Link>
                    </div>

                    <div className="header-right">
                        <nav className="nav">
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <Link to={"/"}>Trang chủ</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='/allproduct'>Sản phẩm
                                        <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                                    </Link>
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

                                </li>
                                <li className="nav-item">
                                    <Link to='/article'>Bài viết</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/contact'>Liên hệ</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="search-cart-user">
                            <div className="search"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <div className="icon-search">
                                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                    <div className="text-tim-kiem">
                                        <div className="arrow-up"></div>
                                        <p>Tìm kiếm</p>
                                    </div>
                                </div>

                                {isSearchOpen && (<div className="overlay" onClick={() => setIsSearchOpen(false)}></div>)}

                                {isSearchOpen && (
                                    <div className="sub-search" ref={inputRef}>
                                        <FontAwesomeIcon icon="fa-solid fa-caret-up" className="arrow-up" />
                                        <div className="sub-search-text-tim-kiem">
                                            <h3>TÌM KIẾM</h3>
                                        </div>
                                        <div className="input">
                                            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                                            <div className="sub-icon-search">
                                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="cart">
                                <Link to={"/cart"}>
                                    <div className="icon-cart">
                                        <FontAwesomeIcon icon="fa-cart-shopping" />
                                        <div className="text-gio-hang">
                                            <div className="arrow-up"></div>
                                            <p>Giỏ hàng</p>
                                        </div>
                                        <div className="soluong">
                                            <span>{cartQuantity}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="account">
                                <div className="icon-user">

                                    <Link to={"/login-register"}>

                                        <FontAwesomeIcon icon="fa-circle-user" />
                                        <div className="arrow-up"></div>
                                        <div className="text-dang-nhap">
                                            <div className="arrow-up"></div>
                                            <p>Đăng nhập</p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Phần này là để đăng nhập hiển thị người dùng */}
                                {/* <div className="user">
                                    <img src="../../../../src/assets/images/avatar-mac-dinh.png" style={{ height: 30, width: 30 }} alt="" />
                                    <div className="sub-user">
                                        <ul>
                                            <li>
                                                <p>Xin chào<span style={{ marginLeft: 5, fontWeight: "bold" }}>Trương Văn Tiến Đạt</span></p>
                                            </li>
                                            <li>
                                                <Link to={'/info'}>
                                                    <FontAwesomeIcon icon="fa-regular fa-id-badge" fixedWidth />
                                                    <p>Hồ sơ</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/signin'}>
                                                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" fixedWidth />
                                                    <p>Đăng xuất</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </>
    );
}

export default Header;
