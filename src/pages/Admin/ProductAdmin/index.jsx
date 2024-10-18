import { Table, Button } from "antd";
import "./product.css";
import { Link } from "react-router-dom";

const data = [
  {
    key: "1",
    name: "iPhone 16 Pro",
    image: [
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
    ],
    description:
      "Vỏ titan, màn hình Super Retina XDR OLED 6.3 inch, hỗ trợ ProMotion 120Hz.",
    category: "Điện thoại",
    price: "26.000.000 đ",
  },
  {
    key: "2",
    name: "iPhone 16 Pro",
    image: [
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
    ],
    description:
      "Vỏ titan, màn hình Super Retina XDR OLED 6.3 inch, hỗ trợ ProMotion 120Hz.",
    category: "Điện thoại",
    price: "26.000.000 đ",
  },
  {
    key: "3 ",
    name: "iPhone 16 Pro",
    image: [
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
      "../../../../public/anh1.jpg",
    ],
    description:
      "Vỏ titan, màn hình Super Retina XDR OLED 6.3 inch, hỗ trợ ProMotion 120Hz.",
    category: "Điện thoại",
    price: "26.000.000 đ",
  },
  // Các sản phẩm khác...
];

function ProductAdmin() {
  const columns = [
    {
      // title tên cột
      title: "ID",
      // dataIndex: lấy dữ liệu từ mảng có trường là key (có thể thay thế trông data là id)
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      //thay vì chỉ hiện thị 1 ảnh , dùng render truyển vào mảng image và map qua nó
      render: (images) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Product"
              style={{ width: "100px", height: "auto" }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",

      render: () => (
        <span className="action-product">
          <Button type="primary">
            <Link to="/admin/editProduct">Edit</Link>
          </Button>

          <Button type="primary" danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="add-product">
        <Button type="primary">
          <Link to="/admin/add-product">Add product</Link>
        </Button>
      </div>

      <Table
        // truyền các props gồm cột và data
        columns={columns}
        dataSource={data}
        // phân trang
        pagination={{
          pageSize: 5, // Số lượng sản phẩm hiển thị trên mỗi trang
        }}
      />
    </>
  );
}

export default ProductAdmin;
