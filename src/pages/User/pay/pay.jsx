import './pay.css'
import Logo_pay from '../../../assets/images/logo_pay.png'
import Logo from '/Logo.png'
import Momo from '../../../assets/images/logo-momo.png'
import { Input, Radio, Space, Button } from 'antd';
// import { AiFillBank } from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import AuthService from '../../../services/authService'
import { useContext } from 'react'
import { UserContext } from '../../../components/context/authContext'
import CartService from '../../../services/cartService'
import { CartContext } from '../../../components/context/CartContext'
import { formatCurrency } from '../../../config/config';
import { showToastError, showToastSuccess, showToastWarning } from '../../../config/toastConfig';
import PaymentMethod from '../../../services/paymentMethodService';
import { Link } from 'react-router-dom';

function Pay() {
    const { user } = useContext(UserContext)
    const { totalQuantity } = useContext(CartContext)
    const idUser = user.account.id

    const [infoUser, setInfoUser] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        note: ''
    })

    const [cart, setCart] = useState([])
    const [value, setValue] = useState(1); // 1: COD, 2: Momo

    useEffect(() => {
        fechtUser()
        fechtCart()
    }, [])

    const fechtUser = async () => {
        const dataUser = await AuthService.getOneUser(idUser)
        if (dataUser && dataUser.EC === 0) {
            setInfoUser(dataUser.data)
        }
    }

    const fechtCart = async () => {
        const dataCart = await CartService.getCart(idUser)
        if (dataCart && dataCart.EC === 0) {
            setCart(dataCart.data)
        }
    }

    const handleOnChangeInfo = (e) => {
        const { name, value } = e.target
        setInfoUser({
            ...infoUser,
            [name]: value
        })
    }

    const getProductPrice = (item) => {
        return item?.productData?.promotion_price > 0
            ? item?.productData?.promotion_price
            : item?.productData?.price;
    }

    const temporaryPrice = Array.isArray(cart)
        ? cart.reduce((total, item) => total + getProductPrice(item) * item.quantity, 0)
        : 0;

    const totalPrice = temporaryPrice + 50000

    const handleValidateInfo = () => {
        if (!infoUser.full_name.trim()) {
            showToastError("Họ và tên không được để trống")
            return false;
        }
        if (!infoUser.email) {
            showToastError("Email không được để trống")
            return false;
        }
        if (!infoUser.phone) {
            showToastError("Số điện thoại không được để trống")
            return false;
        }
        if (!infoUser.address) {
            showToastError("Địa chỉ không được để trống")
            return false;
        }
        return true;
    };

    const isButtonDisabled = () => {
        return !handleValidateInfo || cart.length === 0
    }


    //Dùng để lấy những product đã thêm vào giỏ hàng để gửi lên server để tạo thanh toán
    const getProductsData = () => {
        const productsData = cart.map(item => ({
            product_id: item.product_id, // Lấy product_id
            price: getProductPrice(item),
            quantity: item.quantity,      // Lấy quantity
        }));
        return productsData;
    }

    const handleDatHang = async () => {
        if (!handleValidateInfo()) return

        if (user.account.role === 'admin') {
            return showToastWarning("Quản trị viên không được phép đặt hàng!")
        }

        const productData = getProductsData()

        if (value === 1) {
            const response = await PaymentMethod.postPaymentCOD({
                amount: totalPrice, // Tổng giá trị đơn hàng
                idUser: idUser, // ID của người dùng
                address: infoUser.address, // Địa chỉ người nhận
                cartId: cart[0]?.cart_id, // Lấy cart_id từ sản phẩm đầu tiên trong giỏ hàng,
                note: infoUser.note, // Ghi chú đơn hàng
                orderIdCode: `ORDER_${Date.now()}`, // ID đơn hàng, có thể sử dụng thời gian hiện tại
                orderInfo: 'Thanh toán khi nhận hàng (COD)',
                productsItem: productData, // Thêm thông tin sản phẩm vào request
            })

            console.log(response.data); // Xem nội dung response

            if (response && response.EC === 0) {
                setTimeout(() => {
                    window.location.href = `/thankyou?orderId=${response.data.order_id_code}&paymentMethod=COD`;
                }, 2000)
                showToastSuccess("Đặt hàng thành công.")
            } else {
                showToastError('Không thể tạo đơn hàng COD! Lý do: ' + (response.data?.message || 'Không có thông tin phản hồi'));
            }

        } else if (value === 2) {
            const response = await PaymentMethod.postPaymentMomo({
                amount: totalPrice, // Tổng giá trị đơn hàng
                idUser: idUser, // ID của người dùng
                address: infoUser.address, // Địa chỉ người nhận
                cartId: cart[0]?.cart_id, // Lấy cart_id từ sản phẩm đầu tiên trong giỏ hàng,
                note: infoUser.note, // Ghi chú đơn hàng
                orderIdCode: `ORDER_MOMO_${Date.now()}`, // ID đơn hàng, có thể sử dụng thời gian hiện tại
                orderInfo: 'Thanh toán đơn hàng qua MOMO',
                productsItem: productData, // Thêm thông tin sản phẩm vào request
            })
            // Kiểm tra phản hồi và điều hướng nếu thành công
            if (response.data?.success) {
                if (response.data.payUrl) {
                    window.location.href = response.data.payUrl;
                } else {
                    showToastError('Không thể tạo giao dịch MoMo! Lý do: Không có URL thanh toán');
                }
            } else {
                console.log(response.data); // Xem nội dung response
                showToastError('Không thể tạo giao dịch MoMo! Lý do: ' + (response.data?.message || 'Không có thông tin phản hồi'));
            }
        }
    }

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
                                <Input
                                    placeholder='Họ và tên'
                                    name='full_name'
                                    value={infoUser.full_name}
                                    onChange={handleOnChangeInfo}
                                    size='large'
                                />

                                <Input
                                    placeholder='Email'
                                    name='email'
                                    value={infoUser.email}
                                    onChange={handleOnChangeInfo}
                                    size='large'
                                />

                                <Input
                                    placeholder='Số điện thoại'
                                    name='phone'
                                    value={infoUser.phone}
                                    size='large'
                                />

                                <Input
                                    placeholder='Địa chỉ'
                                    name='address'
                                    value={infoUser.address}
                                    onChange={handleOnChangeInfo}
                                    size='large'
                                />

                                <TextArea
                                    name='note'
                                    onChange={handleOnChangeInfo}
                                    placeholder='Ghi chú'
                                />
                            </div>

                            <div className="van-chuyen-thanh-toan">
                                <div className="van-chuyen">
                                    <h2>Vận chuyển</h2>
                                    <div className="box-text-van-chuyen">
                                        <Radio checked>
                                            Giao hàng tận nơi
                                        </Radio>
                                        <span>50.000đ</span>
                                    </div>
                                </div>

                                <div className="thanh-toan">
                                    <h2>Thanh toán</h2>
                                    <Radio.Group onChange={(e) => setValue(e.target.value)} value={value} style={{ width: '100%' }} >
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <div className='box-text-thanh-toan'>
                                                <Radio value={1}>Thanh toán khi nhận hàng (COD)</Radio>
                                                <FaHandHoldingUsd style={{ height: '30px', width: '30px' }} />
                                            </div>
                                            <div className='box-text-thanh-toan'>
                                                <Radio value={2}>Thanh toán bằng Momo</Radio>
                                                <img src={Momo} style={{ height: '30px', width: '30px' }} alt="" />
                                            </div>
                                            {/* <div className='box-text-thanh-toan'>
                                                <Radio value={3}>Thanh toán bằng ngân hàng</Radio>
                                                <AiFillBank style={{ height: '30px', width: '30px' }} />
                                            </div> */}
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pay-box-right">
                        <div className="header-tong-san-pham">
                            <h3>Đơn hàng ( <span>{totalQuantity}</span> sản phẩm )</h3>
                        </div>
                        {cart && cart.map((item, index) => (
                            <div key={index} className="box-san-pham">
                                <img src={`${import.meta.env.VITE_API_URL}/uploads/${item?.productData?.image[0]}`} style={{ width: '70px', height: '70px' }} alt="" />
                                <div className="thong-tin-san-pham">
                                    <h3 title='Tai nghe Edifier W830BT'>{item?.productData.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            {item?.productData?.promotion_price > 0 ? (
                                                <>
                                                    <del style={{ fontSize: '13px', textDecorationLine: 'line-through' }}>
                                                        {formatCurrency(item?.productData?.price)}
                                                    </del>
                                                    <p style={{ fontSize: '16px', color: 'red' }} className="item-price">{formatCurrency(item?.productData?.promotion_price)}</p>
                                                </>
                                            ) : (
                                                <p style={{ fontSize: '16px', color: 'red' }} className="item-price">{formatCurrency(item?.productData?.price)}</p>
                                            )}
                                        </div>
                                        <p>x{item?.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <hr />

                        {/* <div className="ma-giam-gia">
                            <Input placeholder='Mã giảm giá' />
                            <Button type="primary" disabled danger>
                                Áp dụng
                            </Button>
                        </div> */}

                        <hr />

                        <div className="phi">
                            <div className="tam-tinh">
                                <p>Tạm tính:</p>
                                <p>{formatCurrency(temporaryPrice)}</p>
                            </div>
                            <div className="phi-van-chuyen">
                                <p>Phí vận chuyển:</p>
                                <p>50.000 đ</p>
                            </div>
                        </div>

                        <hr />

                        <div className="tong-cong">
                            <p>Tổng cộng:</p>
                            <span>{formatCurrency(totalPrice)}</span>
                        </div>

                        <div className="dat-hang">
                            <Link to={`/cart/${idUser}`}>
                                <p> {"< Quay về trang giỏ hàng"} </p>
                            </Link>
                            <Button type="primary" danger onClick={handleDatHang} disabled={isButtonDisabled()}>
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