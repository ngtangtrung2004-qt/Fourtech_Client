import { Table, Button, Typography, message } from "antd";
import "./orderDetail.css";

// Dữ liệu giả lập cho đơn hàng
const orderData = {
  customerName: "Trần hoàng hải",
  address: "117 nguyễn huy tưởng",
  phone: "0123456789",
  items: [
    {
      key: "1",
      name: "iPhone 16 Pro",
      quantity: 2,
      price: 26000000,
    },
    {
      key: "2",
      name: "Laptop Acer",
      quantity: 1,
      price: 9450000,
    },
  ],
  status: "Chưa giao",
};

function OrderDetail() {
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Thành tiền",
      render: (text, record) =>
        `${(record.price * record.quantity).toLocaleString()} đ`,
    },
  ];

  const totalAmount = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleUpdateStatus = () => {
    // Cập nhật trạng thái đơn hàng (giả lập)
    message.success("Trạng thái đơn hàng đã được cập nhật!");
  };

  return (
    <div className="order-detail">
      <Typography.Title level={2}>Chi tiết đơn hàng</Typography.Title>
      <Typography.Paragraph>
        <strong>Khách hàng:</strong> {orderData.customerName}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Địa chỉ:</strong> {orderData.address}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Số điện thoại:</strong> {orderData.phone}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Trạng thái:</strong> {orderData.status}
      </Typography.Paragraph>

      <Table
        columns={columns}
        dataSource={orderData.items}
        pagination={false}
        footer={() => (
          <div>
            <strong>Tổng cộng: {totalAmount.toLocaleString()} đ</strong>
          </div>
        )}
      />

      <Button type="primary" onClick={handleUpdateStatus}>
        Cập nhật trạng thái đơn hàng
      </Button>
    </div>
  );
}

export default OrderDetail;
