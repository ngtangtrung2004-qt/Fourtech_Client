import { Table, Button, Typography, Modal } from "antd";
import OrderService from "../../../services/orderService";
import "./orderDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../config/config";
import { showToastSuccess } from "../../../config/toastConfig";

function OrderDetail() {

  const { orderIdCode } = useParams();
  const [orderDetail, setOrderDetail] = useState({})
  const [openModalEdit, setOpenModalEdit] = useState(false)

  // State để lưu giá trị dropdown tạm thời
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [orderStatus, setOrderStatus] = useState(0);

  useEffect(() => {
    fechtAPIOrderDetail()
  }, [])

  const fechtAPIOrderDetail = async () => {
    const dataOrderDetail = await OrderService.getOrderDetail(orderIdCode);

    if (dataOrderDetail && dataOrderDetail?.EC === 0) {
      const formatDataProductItem = dataOrderDetail.data.productItem.map((pro, index) => ({
        ...pro,
        key: index
      }));

      setOrderDetail({
        ...dataOrderDetail.data,
        productItem: formatDataProductItem
      });

      // Đồng bộ giá trị ban đầu vào state
      setPaymentStatus(dataOrderDetail.data.payment_status || 0);
      setOrderStatus(dataOrderDetail.data.status || 0);

      // Đảm bảo paymentStatus không thay đổi sau khi tải lại
      setDataUpdate((prevData) => ({
        ...prevData,
        newPaymentStatus: dataOrderDetail.data.payment_status || prevData.newPaymentStatus
      }));
    }
  };

  const [dataUpdate, setDataUpdate] = useState({
    newStatus: orderStatus,
    newPaymentStatus: paymentStatus,
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity_product",
    },
    {
      title: "Giá",
      dataIndex: "price_product",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Thành tiền",
      render: (text, record) => formatCurrency(record.price_product * record.quantity_product)
    },
  ];

  const getOrderStatus = (status) => {
    switch (status) {
      case 0:
        return "Đang chuẩn bị hàng";
      case 1:
        return "Đang vận chuyển";
      case 2:
        return "Đã giao hàng";
      default:
        return "Trạng thái không xác định";
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case 0:
        return "Chưa thanh toán";
      case 1:
        return "Đã thanh toán";
      default:
        return "Trạng thái không xác định";
    }
  };

  const totalPrice = orderDetail?.productItem?.reduce(
    (sum, item) => sum + item.price_product * item.quantity_product,
    0
  );

  const handleModalEdit = () => {
    setOpenModalEdit(true)
  };

  const handleCancel = () => {
    setOpenModalEdit(false)
  }

  const hanldeEditOrder = async () => {
    const response = await OrderService.putOrder(orderIdCode, dataUpdate);
    if (response && response?.EC === 0) {
      showToastSuccess(response.message)
      setOpenModalEdit(false);
      fechtAPIOrderDetail(); // Lấy lại dữ liệu mới sau khi cập nhật
    }
  };

  // Kiểm tra nếu tất cả các trường đều disabled
  const isDisabled = orderDetail.payment_status === 1 && orderDetail.status === 2;

  return (
    <div className="order-detail">
      <Typography.Title level={2}>Chi tiết đơn hàng</Typography.Title>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <Typography.Paragraph>
            <strong>Mã đơn hàng:</strong> {orderDetail.order_id_code}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Khách hàng:</strong> {orderDetail.full_name}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Email:</strong> {orderDetail.email}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Số điện thoại:</strong> {orderDetail.phone}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Địa chỉ giao hàng:</strong> {orderDetail.address}
          </Typography.Paragraph>
        </div>

        <div>
          <Typography.Paragraph>
            <strong>Phương thức thanh toán:</strong> {orderDetail.payment_methor}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Trạng thái thanh toán:</strong> {getPaymentStatus(orderDetail.payment_status)}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Trạng thái đơn hàng:</strong> {getOrderStatus(orderDetail.status)}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Ghi chú:</strong> {orderDetail.note ? orderDetail.note : "Không có ghi chú"}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Ngày mua:</strong> {formatDate(orderDetail.created_at)}
          </Typography.Paragraph>
        </div>
      </div>

      <Button type="primary" onClick={handleModalEdit}>
        Cập nhật đơn hàng
      </Button>
      <Modal
        title="Cập nhật đơn hàng"
        open={openModalEdit}
        onCancel={handleCancel}
        centered
        footer={null}
        getContainer={false}
      >
        <div className="form-edit-order">
          <div className="form-edit-order-item">
            <label htmlFor="order_id_code">Mã đơn hàng:</label>
            <input type="text" id="order_id_code" disabled value={orderDetail.order_id_code} />
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="full_name">Họ và tên:</label>
            <input type="text" id="full_name" disabled value={orderDetail.full_name} />
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" disabled value={orderDetail.email} />
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="phone">Số điện thoại:</label>
            <input type="phone" id="phone" disabled value={orderDetail.phone} />
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="address">Địa chỉ giao hàng:</label>
            <input type="address" id="address" disabled value={orderDetail.address} />
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="payment_methor">Phương thức thanh toán:</label>
            <input type="address" id="address" disabled value={orderDetail.payment_methor} />
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="payment_status">Trạng thái thanh toán:</label>
            <select
              name="payment_status"
              id="payment_status"
              value={paymentStatus} // Sử dụng defaultValue cho giá trị ban đầu
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setPaymentStatus(value);
                setDataUpdate({ ...dataUpdate, newPaymentStatus: value });
              }}
              disabled={orderDetail.payment_status === 1} // Khóa dropdown nếu đã thanh toán
            >
              <option value="0">Chưa thanh toán</option>
              <option value="1">Đã thanh toán</option>
            </select>
          </div>

          <div className="form-edit-order-item">
            <label htmlFor="status">Trạng thái thanh toán:</label>
            <select
              name='status'
              id="status"
              value={orderStatus}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setOrderStatus(value);
                setDataUpdate({ ...dataUpdate, newStatus: value });
              }}
              disabled={orderDetail.status === 2}
            >
              <option value="0">Đang chuẩn bị hàng</option>
              <option value="1">Đang vận chuyển</option>
              <option value="2">Đã giao hàng</option>
            </select>
          </div>
        </div>
        <Button
          type="primary"
          style={{ marginTop: '30px', width: '100%' }}
          disabled={isDisabled}
          onClick={hanldeEditOrder}
        >
          Cập nhât
        </Button>
      </Modal>

      <Table
        columns={columns}
        dataSource={orderDetail.productItem || []}
        pagination={false}
        footer={() => (
          <div style={{ textAlign: 'right' }}>
            <strong>Tổng cộng: {formatCurrency(totalPrice)}</strong>
          </div>
        )}
      />
    </div>
  );
}

export default OrderDetail;
