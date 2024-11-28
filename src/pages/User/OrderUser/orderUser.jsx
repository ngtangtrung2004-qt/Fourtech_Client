import { Button, Modal, Table } from 'antd';
import { formatCurrency, formatDate } from '../../../config/config';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../components/context/authContext';
import OrderService from '../../../services/orderService';
import './orderUser.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function OrderUser() {
    const { user } = useContext(UserContext)
    const [listOrder, setListOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState({})
    const [openModal, setOpenModal] = useState()

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

    const shippingInformation = (item) => {
        if (item === 0) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FontAwesomeIcon icon="fa-solid fa-dumpster-fire" />Đang chuẩn bị hàng
                </p>
            )
        } else if (item === 1) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FontAwesomeIcon icon="fa-solid fa-truck-fast" />Đang giao hàng
                </p>
            )
        } else if (item === 2) {
            return (
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FontAwesomeIcon icon="fa-solid fa-check" />Đã giao
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
                        return <p>Đang chuẩn bị hàng</p>
                    case 1:
                        return <p>Đang chuẩn vận chuyển</p>
                    case 2:
                        return <p>Đã giao hàng </p>
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