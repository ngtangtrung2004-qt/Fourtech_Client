import { Table, Button } from "antd";
import EditCategory from "./EditCategory";
import "./edit.css";
import { Link } from "react-router-dom";
const data = [
  {
    key: "1",
    name: "Điện thoại",
    image: "../../../../public/anh1.jpg", 
  },
  {
    key: "2",
    name: "Bàn phím",
    image: "../../../../public/anh1.jpg", 
  },
  {
    key: "3",
    name: "Tai nghe",
    image: "../../../../public/anh1.jpg", 
  },
  {
    key: "4",
    name: "Đèn học",
    image: "../../../../public/anh1.jpg", 
  },
  {
    key: "5",
    name: "Lót chuột",
    image: "../../../../public/anh1.jpg", 
  },
];
function CategoryAdmin() {
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Name_Category",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => (
        <img
          src={img}
          alt="Product"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      render: () => (
        <span className="action-product">
          <EditCategory></EditCategory>
          <Button type="primary" danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];
  return (
    <>
      {/* <div className='add-product' ><CreateProduct></CreateProduct></div> */}
      <div className="add-product">
        <Button type="primary">
          <Link to="/admin/add-category">Thêm danh mục</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{
          pageSize: 5, // Số lượng sản phẩm hiển thị trên mỗi trang
        }} />
    </>
  );
}

export default CategoryAdmin;
