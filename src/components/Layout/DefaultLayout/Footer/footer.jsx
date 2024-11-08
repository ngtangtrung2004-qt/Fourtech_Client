import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import backgroundFooter from '../../../../assets/images/background-footer.jpg'
import './footer.css'
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer style={{ backgroundImage: `url(${backgroundFooter})` }}>
                <div className="container-footer">
                    <div className="footer-top">
                        <Link to={'/'}>
                            <img src="/Logo.png" alt="" style={{ height: 70, width: 70 }} />
                        </Link>
                        <hr />
                        <h2>FOURTECH</h2>
                    </div>

                    <div className="footer-main">
                        <div className="footer-main-left">
                            <div className="ten-cong-ty">
                                <h2>CÔNG TY TNHH BỐN THÀNH VIÊN</h2>
                                <hr />
                            </div>

                            <div className="dia-chi">
                                <FontAwesomeIcon icon={faLocationDot} className='icon-dia-chi' />
                                <p>116 Nguyễn Huy Tưởng, Hoà An, Liên Chiểu, Đà Nẵng 550000, Việt Nam</p>
                            </div>

                            <div className="dien-thoai">
                                <FontAwesomeIcon icon={faPhone} />
                                <p>023 470 2354</p>
                            </div>

                            <div className="email">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p>fourtech@gmail.com</p>
                            </div>
                        </div>

                        <div className="footer-main-center">
                            <div className='ve-chung-toi'>
                                <h2>VỀ CHÚNG TÔI</h2>
                                <hr />
                            </div>

                            <div className="content-ve-chung-toi">
                                <ul>
                                    <li>
                                        <Link>Chúng tôi là ai</Link>
                                    </li>
                                    <li>
                                        <Link>Tin tức & Sự kiện</Link>
                                    </li>
                                    <li>
                                        <Link>Trả góp 0% lãi suất qua thẻ</Link>
                                    </li>
                                    <li>
                                        <Link>Quà tặng doanh nghiệp</Link>
                                    </li>
                                    <li>
                                        <Link>Tuyển dụng</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-main-right">
                            <div className='cac-chinh-sach'>
                                <h2>CÁC CHÍNH SÁCH</h2>
                                <hr />
                            </div>

                            <div className="content-cac-chinh-sach">
                                <ul>
                                    <li>
                                        <Link>Chương trình thành viên</Link>
                                    </li>
                                    <li>
                                        <Link>Chính sách đặt trước</Link>
                                    </li>
                                    <li>
                                        <Link>Chính sách đổi trả & bảo hàng</Link>
                                    </li>
                                    <li>
                                        <Link>Kiểm tra hành trình đơn hàng</Link>
                                    </li>
                                    <li>
                                        <Link>Hướng dẫn mua hàng & thanh toán</Link>
                                    </li>
                                    <li>
                                        <Link>Chính sách bảo mật thông tin</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom">
                <p>© 2024 - Bản quyền của Công ty TNHH Bốn Thành Viên - Four Guy One Dream</p>
            </div>
        </>
    );
}

export default Footer;