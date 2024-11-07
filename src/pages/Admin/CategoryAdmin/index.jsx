import { Table, Button } from "antd";
import EditCategory from "./EditCategory";
import "./edit.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function CategoryAdmin() {
  const [dataCategory,setDataCategory] = useState([])
  useEffect(()=>{
    const fetchCategory = async ()=>{
      try{
        const res = await fetch('http://localhost:3000/api/categories')
        const data = await res.json();
        const formatData = data.map((cate,index)=>({
          key:index+1 ,
          name:cate.categoryName,
          image:cate.categoryImage
        }))
        setDataCategory(formatData)

      }catch(error){
        console.error('error fetching products:', error)
      }
    }
    fetchCategory()
  },[])
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
       render: (image) => <img src={image} alt="Category" style={{ width: "50px", height: "50px" }} />,
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
      <Table columns={columns} dataSource={dataCategory} pagination={{
          pageSize: 5, // Số lượng sản phẩm hiển thị trên mỗi trang
        }} />
    </>
  );
}

export default CategoryAdmin;
