
import '../Home/index.css'
import ItemProduct from '../../../components/ItemProduct/ItemProduct';
import Voucher from '../../../components/Voucher/Voucher';
import HeaderProduct from './headerProduct';
import Event from '../../../components/Event/Event';
import ItemAccessory from '../../../components/itemAccessory/itemAccessory';
import NewTechnology from '../../../components/newTechnology';
import { useEffect, useState } from "react";
import Category from '../../../components/Category/Category';
import CategoryService from '../../../services/categoryService';
// import axios from 'axios';



const images = [
    "Banner1.webp",
    "Banner5.webp",
];


function HomePage() {
    const [listNews, setListNews] = useState([])
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [category, setCategory] = useState([])

    useEffect(() => {
        fechtCategory()
    }, [])

    const fechtCategory = async () => {
        const dataCategory = await CategoryService.getAllCategory()
        if (dataCategory && dataCategory.EC === 0) {
            setCategory(dataCategory.data)
        }
    }

    useEffect(() => {
        const fechtNews = async () => {
            if (listNews.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/news`);
                const data = await res.json();
                setListNews(data.slice(0, 4)); // Chỉ lấy 4 phần tử
            } catch (error) {
                console.error("Lỗi khi lấy danh sách Tin tức", error);
            }
        };
        fechtNews();
    }, []);




    // Set the target date to 2 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);

    const calculateTimeLeft = () => {
        const now = new Date().getTime(); // Get current time in milliseconds
        const difference = targetDate.getTime() - now;

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);



    // State dùng để lưu vị trí của ảnh hiện tại trong slideshow
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // useEffect sẽ chạy khi component được render lần đầu tiên
    useEffect(() => {
        // Thiết lập một interval để tự động chuyển ảnh sau một khoảng thời gian nhất định
        const interval = setInterval(() => {
            // Cập nhật vị trí của ảnh hiện tại
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        // Trả về một hàm để xóa interval khi component bị unmount
        // Điều này giúp tránh việc interval tiếp tục chạy gây memory leak
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='container-home'>
                <div className='Banner'>
                    <div className="left-section">
                        <img className='Banner1' src={images[currentImageIndex]}
                            alt={`slide ${currentImageIndex}`} />
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
                <Category></Category>
                <div className="deal-banner">
                    <div className="deal-title">
                        <span className="lightning-icon">⚡</span>
                        <span>GIỜ VÀNG DEAL SỐC</span>
                    </div>
                    <div className="countdown-container">
                        <p>Nhanh lên nào! <br />Sự kiện sẽ kết thúc sau</p>
                        <div className="countdown">
                            <div className="time-box">
                                <span className="number">{time.days}</span>
                                <span className="label">Ngày</span>
                            </div>
                            <div className="time-box">
                                <span className="number">{time.hours}</span>
                                <span className="label">Giờ</span>
                            </div>
                            <div className="time-box">
                                <span className="number">{time.minutes}</span>
                                <span className="label">Phút</span>
                            </div>
                            <div className="time-box">
                                <span className="number">{time.seconds}</span>
                                <span className="label">Giây</span>
                            </div>
                        </div>
                    </div>
                </div>
                {category.length > 0 && (
                    <>
                        {category.find(cat => cat.name === "Tai Nghe") && (
                            <>
                                <HeaderProduct title={category.find(cat => cat.name === "Tai Nghe").name} url={'/allproduct'} />
                                <ItemProduct filter={category.find(cat => cat.name === "Tai Nghe").id} />
                            </>
                        )}
                        <Voucher />
                        <Event />
                        {category.find(cat => cat.name === "Máy Chơi Game") && (
                            <>
                                <HeaderProduct title={category.find(cat => cat.name === "Máy Chơi Game").name} url={'/allproduct'} />
                                <ItemProduct filter={category.find(cat => cat.name === "Máy Chơi Game").id} />
                            </>
                        )}
                        {category.find(cat => cat.name === "Chuột") && (
                            <>
                                <HeaderProduct title={category.find(cat => cat.name === "Chuột").name} url={'/allproduct'} />
                                <ItemProduct filter={category.find(cat => cat.name === "Chuột").id} />
                            </>
                        )}
                    </>
                )}
                <ItemAccessory />
                <HeaderProduct title={"Bản Tin công nghệ"} url={'/news'} />

                <NewTechnology data={listNews} />
            </div>

        </>
    );
}

export default HomePage;