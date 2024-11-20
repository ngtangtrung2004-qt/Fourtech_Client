import logo from "/Logo.png";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import { CartContext } from "../../../CartContext/CartContext";
import { UserContext } from "../../../context/authContext";
import AuthService from "../../../../services/authService";
import { showToastSuccess } from "../../../../config/toastConfig";
import CategoryService from "../../../../services/categoryService";

function Header() {
  const [category, setHeaderCategory] = useState([]);

  useEffect(() => {
    fetchAPICategory();
  }, []);
  const fetchAPICategory = async () => {
    const dataCategory = await CategoryService.getAllCategory();
    console.log(dataCategory.data);
    setHeaderCategory(dataCategory.data);
  };

  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [account, setAccount] = useState()
  const { user, logoutContext } = useContext(UserContext);

  const inputRef = useRef(null);
  const { cartQuantity } = useContext(CartContext);

  useEffect(() => {
    const handelClickOutSide = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handelClickOutSide);
    } else {
      document.removeEventListener("mousedown", handelClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handelClickOutSide);
    };
  }, [isSearchOpen]);

  const handleLogout = async () => {
    let data = await AuthService.Logout(); //clear cookie

    if (data && data.EC === 0) {
      logoutContext(); //clear context
      showToastSuccess(data.message);
      navigate("/login-register");
    }
  };

  return (
    <>
      <header className="container-header">
        <div className="header">
          <div className="header-left">
            <Link to={"/"}>
              <img src={logo} style={{ height: 70, width: 70 }} alt="" />
            </Link>
          </div>

          <div className="header-right">
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to={"/"}>Trang chủ</Link>
                </li>

<<<<<<< HEAD
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
                                            <li className="sub-nav-item">
                                                <Link>Tai nghe</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Máy tính bảng</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Ghế công thái học</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Thiết bị âm thanh</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Cáp sạc</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Phụ kiện</Link>
                                            </li>
                                            <li className="sub-nav-item">
                                                <Link>Củ sạc</Link>
                                            </li>
                                        </ul>
                                    </div>
=======
                <li className="nav-item">
                  <Link to="/allproduct">
                    Sản phẩm
                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                  </Link>
                  <div className="sub-nav">
                    <ul className="sub-nav-list">
                      {category.map((item) => (
                        <li className="sub-nav-item" key={item.id}>
                          <Link>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/article">Bài viết</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">Liên hệ</Link>
                </li>
              </ul>
            </nav>
>>>>>>> deb203552a2e29b6908d356a3e6609735254d42c

            <div className="search-cart-user">
              <div className="search" onClick={() => setIsSearchOpen(true)}>
                <div className="icon-search">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                  <div className="text-tim-kiem">
                    <div className="arrow-up"></div>
                    <p>Tìm kiếm</p>
                  </div>
                </div>

                {isSearchOpen && (
                  <div
                    className="overlay"
                    onClick={() => setIsSearchOpen(false)}
                  ></div>
                )}

                {isSearchOpen && (
                  <div className="sub-search" ref={inputRef}>
                    <FontAwesomeIcon
                      icon="fa-solid fa-caret-up"
                      className="arrow-up"
                    />
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
                <Link to={`/cart/${user.account.id}`}>
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
                {user && user.isAuthenticated === true ? (
                  <div className="user">
                    <img
                      src={
                        import.meta.env.VITE_API_URL +
                        "/uploads/" +
                        user?.account?.avatar
                      }
                      style={{ height: 30, width: 30 }}
                      alt="avatar"
                    />
                    <div className="sub-user">
                      <ul>
                        <li>
                          <p>
                            Xin chào
                            <span style={{ marginLeft: 5, fontWeight: "bold" }}>
                              {user?.account?.full_name}
                            </span>
                          </p>
                        </li>
                        {user?.account?.role === "admin" ? (
                          <li>
                            <Link to="/admin/">
                              <FontAwesomeIcon
                                icon="fa-solid fa-pen-to-square"
                                fixedWidth
                              />
                              <p>Quản lý</p>
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          <Link to="/info">
                            <FontAwesomeIcon
                              icon="fa-regular fa-id-badge"
                              fixedWidth
                            />
                            <p>Hồ sơ</p>
                          </Link>
                        </li>
                        <li>
                          <Link onClick={() => handleLogout()}>
                            <FontAwesomeIcon
                              icon="fa-solid fa-right-from-bracket"
                              fixedWidth
                            />
                            <p>Đăng xuất</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="icon-user">
                    <Link to="/login-register">
                      <FontAwesomeIcon icon="fa-circle-user" />
                      <div className="arrow-up"></div>
                      <div className="text-dang-nhap">
                        <div className="arrow-up"></div>
                        <p>Đăng nhập</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
