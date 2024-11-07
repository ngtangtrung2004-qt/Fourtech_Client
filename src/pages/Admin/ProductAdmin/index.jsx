import { useEffect, useState}  from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import "./product.css";

function ProductAdmin() {
  // Tạo state để lưu dữ liệu sản phẩm
  const [products, setProducts] = useState([]);
  // console.log(products)

  // Gọi API để lấy dữ liệu từ server khi component được render
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products"); // Địa chỉ API của bạn
        const data = await response.json();
        // Giả sử dữ liệu trả về có cấu trúc giống `data` trong ví dụ gốc
        const formattedData = data.map((product, index) => ({
          key: product.ProductID || index + 1,
          name: product.Name,
          image: product.Images, // Mảng hình ảnh sản phẩm
          description: product.Description,
          category: product.CategoryName,
          price: `${product.Price} đ`,
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
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
        columns={columns}
        dataSource={products}
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
}

export default ProductAdmin;
