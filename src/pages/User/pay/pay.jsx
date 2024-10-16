import './pay.css'
import Logo_pay from '../../../assets/images/logo_pay.png'
import Logo from '/Logo.png'
import anhSanPham from '../../../assets/images/item-Cart.png'
import Momo from '../../../assets/images/logo-momo.png'
import { Input, Select, Radio, Space, Button } from 'antd';
import { AiFillBank } from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import TextArea from 'antd/es/input/TextArea';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function Pay() {
    const { Option } = Select
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
    }, []);

    const [value, setValue] = useState(0);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <>
            <div className="container-pay">
                <div className="header-pay">
                    <img src={Logo_pay} alt="" />
                    <hr />
                    <p>THANH TOÁN</p>
                </div>

                <div className="pay-box">
                    <div className="pay-box-left">
                        <div className="pay-box-left-header">
                            <img src={Logo} alt="" style={{ width: "70px", height: "70px" }} />
                            <hr />
                            <p>FOUR TECH</p>
                        </div>

                        <div className="pay-box-left-content">
                            <div className="thong-tin-nhan-hang">
                                <h2>Thông tin nhận hàng</h2>
                                <Input placeholder='Họ và tên' size='large' />
                                <Input placeholder='Email' size='large' />
                                <Input placeholder='Số điện thoại' size='large' />
                                <Select
                                    placeholder="Chọn tỉnh/thành"
                                    size='large'
                                    style={{ marginBottom: '10px' }}
                                >
                                    <Option value="Quảng Bình">
                                        Quảng Bình
                                    </Option>
                                </Select>
                                <Select
                                    placeholder="Chọn quận/huyện"
                                    size='large'
                                    style={{ marginBottom: '10px' }}
                                >
                                    <Option value="Lệ Thủy">
                                        Lệ Thủy
                                    </Option>
                                </Select>
                                <Select
                                    placeholder="Chọn phường/xã"
                                    size='large'
                                    style={{ marginBottom: '10px' }}
                                >
                                    <Option value="Thị trấn Kiến Giang">
                                        Thị trấn Kiến Giang
                                    </Option>
                                </Select>
                                <Input placeholder='Số nhà' size='large' />
                                <TextArea placeholder='Ghi chú' />
                            </div>

                            <div className="van-chuyen-thanh-toan">
                                <div className="van-chuyen">
                                    <h2>Vận chuyển</h2>
                                    <div className="box-text-van-chuyen">
                                        <Radio checked>
                                            Giao hàng nhận nơi
                                        </Radio>
                                        <span>50.000đ</span>
                                    </div>
                                </div>

                                <div className="thanh-toan">
                                    <h2>Thanh toán</h2>
                                    <Radio.Group onChange={onChange} value={value} style={{ width: '100%' }} >
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <div className='box-text-thanh-toan'>
                                                <Radio value={1}>Thanh toán khi nhận hàng (COD)</Radio>
                                                <FaHandHoldingUsd style={{ height: '30px', width: '30px' }} />
                                            </div>
                                            <div className='box-text-thanh-toan'>
                                                <Radio value={2}>Thanh toán bằng ngân hàng</Radio>
                                                <AiFillBank style={{ height: '30px', width: '30px' }} />
                                            </div>
                                            <div className='box-text-thanh-toan'>
                                                <Radio value={3}>Thanh toán bằng Momo</Radio>
                                                <img src={Momo} style={{ height: '30px', width: '30px' }} alt="" />
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pay-box-right">
                        <div className="header-tong-san-pham">
                            <h3>Đơn hàng ( <span>1</span> sản phẩm )</h3>
                        </div>

                        <div className="box-san-pham">
                            <img src={anhSanPham} style={{ width: '70px', height: '70px' }} alt="" />
                            <div className="thong-tin-san-pham">
                                <h3 title='Tai nghe Edifier W830BT'>Tai nghe Edifier W830BT</h3>
                                <p>Màu: <span>Xám</span></p>
                                <p>4.350.000₫</p>
                            </div>
                        </div>

                        <hr />

                        <div className="ma-giam-gia">
                            <Input placeholder='Mã giảm giá' />
                            <Button type="primary" disabled danger>
                                Áp dụng
                            </Button>
                        </div>

                        <hr />

                        <div className="phi">
                            <div className="tam-tinh">
                                <p>Tạm tính:</p>
                                <p>4.350.000đ</p>
                            </div>
                            <div className="phi-van-chuyen">
                                <p>Phí vận chuyển:</p>
                                <p>50.000đ</p>
                            </div>
                        </div>

                        <hr />

                        <div className="tong-cong">
                            <p>Tổng cộng:</p>
                            <span>4.400.000đ</span>
                        </div>

                        <div className="dat-hang">
                            <Link to={'/cart'}>
                                <p> {"< Quay về trang giỏ hàng"} </p>
                            </Link>
                            <Button type="primary" danger>
                                ĐẶT HÀNG
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pay;