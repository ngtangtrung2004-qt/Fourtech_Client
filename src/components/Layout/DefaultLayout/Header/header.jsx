import logo from '/Logo.png'
import "./header.css"

function Header() {
    return (
        <>
            <header className='header'>
                <div className="header-left">
                    <a href="">
                        <img src={logo} style={{ height: 70, width: 70 }} alt="" />
                    </a>
                </div>

                <div className="header-right">
                    <nav className='nav'>
                        <ul className='nav-list'>
                            <li className='nav-item'><a href="">Trang chủ</a></li>
                            <li className='nav-item'><a href="">Sản phẩm</a></li>
                            <li className='nav-item'><a href="">Khám phá</a></li>
                            <li className='nav-item'><a href="">Bài viết</a></li>
                            <li className='nav-item'><a href="">Liên hệ</a></li>
                        </ul>
                    </nav>

                    <div className='search'>
                        <input type="text" placeholder='Bạn muốn tìm gì?' />
                        <div className='icon-search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className='cart'>
                        <div className='icon-cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className='soluong'>
                            <span>0</span>
                        </div>
                    </div>

                    <div className='account'>
                        <div className="icon-user">
                            <a href="">
                                <i className="fa-solid fa-circle-user"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
