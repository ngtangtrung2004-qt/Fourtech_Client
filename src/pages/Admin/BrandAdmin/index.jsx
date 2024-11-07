import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    key: "1",
    brandName: "Tên thương hiệu",
    brandImage:'https://phucgia.com.vn/wp-content/uploads/2020/03/logo-Asus.jpg'
    
  },
  {
    key: "2",
    brandName: "honag hai",
    brandImage:'https://phucgia.com.vn/wp-content/uploads/2020/03/logo-Asus.jpg'
    
  }
];

function Brand() {
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "BrandName",
      dataIndex: "brandName",
    },
    {title:"image",
      dataIndex:"brandImage",
      render:(image)=><img src={image} alt="Brand" style={{ width: "50px", height: "50px" }} />,
    },
    
    {
      title: "Action",
      render: () => (
        <span className="action-product">
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
          <Link to="/admin/add-brand">Thêm Thương hiệu</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
}

export default Brand;
