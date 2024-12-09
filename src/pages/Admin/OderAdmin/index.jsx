import { Table, Button } from "antd";
import "./orderDetail.css";
import { useEffect, useState } from "react";
import OrderService from "../../../services/orderService";
import { formatCurrency, formatDate } from "../../../config/config";
import { useNavigate } from "react-router-dom";


function OrderList() {
  const navigate = useNavigate()

  useEffect(() => {
    fechtAPIAllOrder()
  }, [])
  const [listOrder, setListOrder] = useState([])

  const fechtAPIAllOrder = async () => {
    const dataAllOrder = await OrderService.getAllOrder()

    if (dataAllOrder && dataAllOrder?.EC === 0) {
      const formatData = dataAllOrder.data.map((order, index) => ({
        ...order,
        index: index + 1,
        key: order.id
      }))
      setListOrder(formatData)
    }
  }

  const handleOrderDetail = (order_id_code) => {
    navigate(`/admin/orderDetail/${order_id_code}`)
  }


  const columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    {
      title: "Mã đặt hàng",
      dataIndex: "order_id_code",
    },
    {
      title: "Khách hàng",
      dataIndex: "full_name",
    },
    {
      title: "Tổng cộng",
      dataIndex: "total_price",
      render: (text) => `${formatCurrency(text)}`,
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payment_status",
      render: (text) => {
        switch (text) {
          case 0:
            return <p style={{ backgroundColor: '#000', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Chưa thanh toán</p>
          case 1:
            return <p style={{ backgroundColor: 'green', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đã thanh toán</p>
          case 3:
            return <p style={{ backgroundColor: 'red', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đã hủy đơn</p>
          default:
            return <p>Trạng thái không xác định</p>
        }
      }
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      render: (text) => {
        switch (text) {
          case 0:
            return <p style={{ backgroundColor: '#5600f5', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đang chuẩn bị hàng</p>
          case 1:
            return <p style={{ backgroundColor: 'yellow', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#000' }}>Đang vận chuyển</p>
          case 2:
            return <p style={{ backgroundColor: 'green', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đã giao</p>
          case 3:
            return <p style={{ backgroundColor: 'red', width: '100%', borderRadius: '5px', textAlign: 'center', color: '#fff' }}>Đã hủy đơn </p>
          default:
            return <p>Trạng thái không xác định</p>
        }
      }
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "created_at",
      render: (text) => formatDate(text)
    },
    {
      title: "Hành động",
      render: (text) => (
        <Button
          onClick={() => handleOrderDetail(text.order_id_code)}
          type="primary"
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="order-list">
        <h2>Danh sách đơn hàng</h2>
        {listOrder.length > 0 ? (
          <Table
            columns={columns}
            dataSource={listOrder}
            pagination={{
              pageSize: 10, // Số lượng đơn hàng hiển thị trên mỗi trang
            }}
          />
        ) :
          (
            <p>Không có đơn hàng nào.</p>
          )
        }
      </div>
    </>
  );
}

export default OrderList;
