// import  { useState } from 'react';
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import "./orderDetail.css";

// Dữ liệu giả lập cho danh sách đơn hàng
const orders = [
  {
    key: "1",
    customerName: "Nguyễn Văn A",
    totalAmount: 52000000,
    // database thay bằng false hoặc true
    status: "Chưa giao",
  },
  {
    key: "2",
    customerName: "Trần Thị B",
    totalAmount: 9450000,
    status: "Đã giao",
  },
  {
    key: "3",
    customerName: "Lê Văn C",
    totalAmount: 22000000,
    status: "Đã hủy",
  },
];

function OrderList() {
  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Tổng cộng",
      dataIndex: "totalAmount",
      //format lại giá tiền
      render: (amount) => `${amount.toLocaleString()} đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      render: (text, record) => (
        <Link to={`/admin/orders/${record.key}`}>
          <Button type="primary">
            Xem chi tiết
            <Link to="/admin/orderDetail"> Xem chi tiết</Link>
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="order-list">
      <h2>Danh sách đơn hàng</h2>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{
          pageSize: 5, // Số lượng đơn hàng hiển thị trên mỗi trang
        }}
      />
    </div>
  );
}

export default OrderList;
