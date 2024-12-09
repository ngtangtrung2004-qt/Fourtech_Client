import { Button, Modal, Table } from 'antd';
import { formatCurrency, formatDate } from '../../../config/config';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../components/context/authContext';
import OrderService from '../../../services/orderService';
import './orderUser.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showToastSuccess } from '../../../config/toastConfig';

function OrderUser() {
    const { user } = useContext(UserContext)
    const [listOrder, setListOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState({})
    const [openModal, setOpenModal] = useState()
    const [openModalCancel, setOpenModalCancel] = useState(false)
    const [openModalFinish, setOpenModalFinish] = useState(false)

    const idUser = user.account.id

    useEffect(() => {
        const fetchAPIOrder = async () => {
            const dataOrder = await OrderService.getOrderByUser(idUser)
            if (dataOrder && dataOrder.EC === 0) {
                const FormatData = dataOrder.data.map((item, index) => ({
                    ...item,
                    key: index,
                    index: index + 1
                }))
                setListOrder(FormatData)
            }
        }
        fetchAPIOrder()
    }, [])

    const handleOpenModal = async (orderIdCode) => {
        setOpenModal(true)
        const dataOrderDetail = await OrderService.getOrderDetail(orderIdCode)

        if (dataOrderDetail && dataOrderDetail.EC === 0) {
            setOrderDetail(dataOrderDetail.data)
        }
    }

    const handleCancelOrder = async (orderIdCode) => {
        setOpenModalCancel(true)
        const dataCancelOrder = await OrderService.putCancelOrder(orderIdCode)
        if (dataCancelOrder?.EC === 0) {
            showToastSuccess(dataCancelOrder.message)
            setListOrder((pre) => (
                pre.map((order) => (
                    order.order_id_code === orderIdCode ? { ...order, status: 3 } : order
                ))
            ))
            setOpenModalCancel(false)
            setOpenModal(false)
        }
    }

    const handleFinishOrder = async (orderIdCode) => {
        setOpenModalFinish(true)
        const dataFinishOrder = await OrderService.putFinishOrder(orderIdCode)
        if (dataFinishOrder?.EC === 0) {
            showToastSuccess(dataFinishOrder.message)
            setListOrder((pre) => (
                pre.map((order) => (
                    order.order_id_code === orderIdCode ? { ...order, status: 2 } : order
                ))
            ))
            setOpenModalFinish(false)
            setOpenModal(false)
        }
    }

    const shippingInformation = (item) => {
        if (item === 0) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#5600f5', width: '40%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>
                    <FontAwesomeIcon icon="fa-solid fa-dumpster-fire" />Đang chuẩn bị hàng
                </p>
            )
        } else if (item === 1) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: 'yellow', width: '40%', borderRadius: '5px', textAlign: 'center', color: '#000' }}>
                    <FontAwesomeIcon icon="fa-solid fa-truck-fast" />Đang giao hàng
                </p>
            )
        } else if (item === 2) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: 'green', width: '40%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>
                    <FontAwesomeIcon icon="fa-solid fa-check" />Đã giao
                </p>
            )
        } else if (item === 3) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: 'red', width: '40%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />Đã hủy đơn hàng
                </p>
            )
        }
    }

    const paymentInformation = (item) => {
        if (item === 0) {
            return (
                <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        backgroundColor: '#000',
                        width: '40%',
                        borderRadius: '5px',
                        textAlign: 'center',
                        color: '#fff'
                    }}
                >
                    Chưa thanh toán
                </p>
            )
        } else if (item === 1) {
            return (
                <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        backgroundColor: 'green',
                        width: '40%',
                        borderRadius: '5px',
                        textAlign: 'center',
                        color: '#fff'
                    }}
                >
                    Đã thanh toán
                </p>
            )
        } else if (item === 3) {
            return (
                <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        backgroundColor: 'red',
                        width: '40%',
                        borderRadius: '5px',
                        textAlign: 'center',
                        color: '#fff'
                    }}
                >
                    Đã hủy đơn hàng
                </p>
            )
        }
    }

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "order_id_code",
        },
        {
            title: "Trạng thái đơn hàng",
            dataIndex: "status",
            render: (text) => {
                switch (text) {
                    case 0:
                        return <p style={{ backgroundColor: '#5600f5', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đang chuẩn bị hàng</p>
                    case 1:
                        return <p style={{ backgroundColor: 'yellow', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#000' }}>Đang giao hàng</p>
                    case 2:
                        return <p style={{ backgroundColor: 'green', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đã giao hàng </p>
                    case 3:
                        return <p style={{ backgroundColor: 'red', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đã hủy đơn hàng</p>
                    default:
                        return <p>Trạng thái không xác định</p>
                }
            },
        },
        {
            title: "Ngày mua",
            dataIndex: "created_at",
            render: (text) => formatDate(text),
        },
        {
            title: "Thao tác",
            render: (text, record) => (
                <span className="action-product">
                    <Button
                        type="primary"
                        onClick={() => handleOpenModal(record.order_id_code)}
                    >
                        Xem chi tiết
                    </Button>
                    <Modal
                        centered
                        open={openModal}
                        onCancel={() => setOpenModal(false)} // Đóng modal khi nhấn Hủy
                        footer={null}
                        getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
                        className='modal_order_user'
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <h4>Mã đơn hàng:</h4>
                                <span>{orderDetail.order_id_code}</span>
                            </div>
                            <div>
                                <h4>Địa chỉ nhận hàng:</h4>
                                <div >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                        <p>{orderDetail.full_name} <span style={{ color: '#939292' }}>({orderDetail.phone})</span></p>
                                    </div>
                                    <p style={{ marginLeft: '15px' }}>{orderDetail.address}</p>
                                </div>
                            </div>
                            <div>
                                <h4>Thông tin thanh toán:</h4>
                                {paymentInformation(orderDetail.payment_status)}
                            </div>
                            <div>
                                <h4>Thông tin vận chuyển:</h4>
                                {shippingInformation(orderDetail.status)}
                            </div>

                            {orderDetail?.productItem?.map((pro, index) => (
                                <div key={index} className='box-san-pham-orderDetail'>
                                    <div className="imageProduct">
                                        <img src={`${import.meta.env.VITE_API_URL}/uploads/${pro?.image_product[0]}`} width='90px' height='90px' alt="" />
                                    </div>

                                    <div className="infoProduct">
                                        <h4>{pro.name_product}</h4>
                                        <div style={{ display: 'flex', gap: '20px' }}>
                                            <p>{formatCurrency(pro?.price_product)}</p>
                                            <p>x{pro?.quantity_product}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <hr />

                            <div style={{ display: 'flex', gap: '10px', fontSize: '30px' }}>
                                <h4>Tổng tiền: </h4>
                                <p>{formatCurrency(orderDetail.total_price)}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '100%' }}>
                                <button
                                    onClick={() => setOpenModalCancel(true)}
                                    disabled={orderDetail.status === 1 || orderDetail.status === 2 || orderDetail.status === 3}
                                    style={{ backgroundColor: 'red', color: '#fff', width: '50%' }}
                                >
                                    Hủy đơn hàng
                                </button>
                                <Modal
                                    title="Xác nhận hủy đơn!"
                                    okText="Xác nhận"
                                    cancelText='Hủy bỏ'
                                    centered
                                    open={openModalCancel}
                                    onOk={() => handleCancelOrder(orderDetail.order_id_code)}
                                    okButtonProps={{ className: "custom-ok-button" }}
                                    onCancel={() => setOpenModalCancel(false)}
                                    getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
                                >
                                    <p>
                                        Bạn có muốn hủy đơn hàng này không?
                                    </p>
                                </Modal>

                                <button
                                    onClick={() => setOpenModalFinish(true)}
                                    disabled={orderDetail.status === 0 || orderDetail.status === 3 || orderDetail.status === 2}
                                    style={{ backgroundColor: 'green', color: '#fff', width: '50%' }}
                                >
                                    Đã nhận được hàng
                                </button>
                                <Modal
                                    title="Xác nhận đã nhận đơn!"
                                    okText="Đã nhận"
                                    cancelText='Hủy bỏ'
                                    centered
                                    open={openModalFinish}
                                    onOk={() => handleFinishOrder(orderDetail.order_id_code)}
                                    onCancel={() => setOpenModalFinish(false)}
                                    getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
                                >
                                    <p>
                                        Bạn đã nhận được đơn hàng này chưa?
                                    </p>
                                </Modal>
                            </div>
                        </div>
                    </Modal>
                </span>
            ),
        },
    ];

    return (
        <>
            <div style={{ backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', padding: '10px 0 0' }}>ĐƠN HÀNG CỦA BẠN</h2>
                <div>
                    <Table
                        columns={columns}
                        dataSource={listOrder}
                        pagination={{
                            pageSize: 10, // Số lượng sản phẩm hiển thị trên mỗi trang
                        }}
                        style={{ textAlign: 'center', margin: '10px' }}
                    />
                </div>
            </div>
        </>
    );
}

export default OrderUser;