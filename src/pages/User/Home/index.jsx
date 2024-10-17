
import '../Home/index.css'
import ItemProduct from '../../../components/ItemProduct/ItemProduct';
import Voucher from '../../../components/Voucher/Voucher';

import Event from '../../../components/Event/Event';
import ItemAccessory from '../../../components/itemAccessory/itemAccessory';
import NewTechnology from '../../../components/newTechnology';
import Item_headphone from '../../../components/Item_headphones/Item_headphone';


function HomePage() {
    return (
        <>
            <div className='container-home'>
                <div className='Banner'>
                    <div className="left-section">
                        <img className='Banner1' src='Banner1.webp' />
                    </div>
                    <div className='right-section'>
                        <img src='Banner2.webp' />
                        <img src='Banner3.webp' />
                        <img src='Banner4.webp' />
                    </div>
                </div>
                <div className="info-banner">
                    <div className="info-item">
                        <i className="fa-solid fa-truck"></i>
                        <div className="info-text">
                            <h4>GIAO HÀNG TỐC</h4>
                            <p>Nội thành TP. Đà Nẵng trong 4h</p>
                        </div>
                    </div>
                    <hr />
                    <div className="info-item">
                        <i className="fa-solid fa-coins"></i>
                        <div className="info-text">
                            <h4>TRẢ GÓP ƯU ĐÃI</h4>
                            <p>Hỗ trợ vay với lãi suất thấp</p>
                        </div>
                    </div>
                    <hr />
                    <div className="info-item">
                        <i className="fa-solid fa-ticket"></i>
                        <div className="info-text">
                            <h4>DEAL HOT BÙNG NỔ</h4>
                            <p>Flash sale giảm giá cực sốc</p>
                        </div>
                    </div>
                    <hr />
                    <div className="info-item">
                        <i className="fa-solid fa-repeat"></i>
                        <div className="info-text">
                            <h4>MIỄN PHÍ ĐỔI TRẢ</h4>
                            <p>Trong vòng 30 ngày miễn phí</p>
                        </div>
                    </div>
                    <hr />
                    <div className="info-item">
                        <i className="fa-regular fa-thumbs-up"></i>
                        <div className="info-text">
                            <h4>HỖ TRỢ 24/7</h4>
                            <p>Hỗ trợ khách hàng 24/7</p>
                        </div>
                    </div>
                </div>

                <div className="product-grid">
                    <a href=''>
                        <div className="product-item">
                            <img src="laptop.webp" alt="Laptop" />
                            <p>Laptop</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="tablet.webp" alt="Máy tính bảng" />
                            <p>Máy tính bảng</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="phone.webp" alt="Điện thoại" />
                            <p>Điện thoại</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="headphone.webp" alt="Tai nghe" />
                            <p>Tai nghe</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="keyboard.webp" alt="Bàn phím" />
                            <p>Bàn phím</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="powerbank.webp" alt="Sạc dự phòng" />
                            <p>Sạc dự phòng</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="mouse.webp" alt="Chuột + Lót chuột" />
                            <p>Chuột + Lót chuột</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="charger.webp" alt="Củ sạc" />
                            <p>Củ sạc</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="pc.webp" alt="Máy tính bàn (PC)" />
                            <p>Máy tính bàn (PC)</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="monitor.webp" alt="Màn hình" />
                            <p>Màn hình</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="audio.webp" alt="Thiết bị âm thanh" />
                            <p>Thiết bị âm thanh</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="playgame.webp" alt="Máy chơi game" />
                            <p>Máy chơi game</p>
                        </div>
                    </a>
                    <a href=''>
                        <div className="product-item">
                            <img src="cable.webp" alt="Cáp sạc" />
                            <p>Cáp sạc</p>
                        </div>
                    </a>
                    <a href=''>
                        <div className="product-item">
                            <img src="accessory.webp" alt="Phụ kiện" />
                            <p>Phụ kiện</p>
                        </div>
                    </a>
                </div>

                <ItemProduct />

                
                <Voucher />
                <Event/>
                <Item_headphone/>

                <ItemAccessory />
                {/* <HeaderProduct title={"Bản Tin công nghệ"}/> */}
                
                <NewTechnology />
            </div>

        </>
    );
}

export default HomePage;