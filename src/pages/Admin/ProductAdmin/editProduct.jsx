import { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";
import ProductService from "../../../services/productService";
import CategoryService from "../../../services/categoryService";
import BrandService from "../../../services/brandService";
import { showToastSuccess } from "../../../config/toastConfig";

const EditProduct = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const { id } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
  const [imageList, setImageList] = useState([]); // Danh sách hình ảnh
  const [imageEdit, setImageEdit] = useState([])
  const [listBrand, setListBrand] = useState([])
  const [listCategory, setListCategory] = useState([])


  useEffect(() => {

    const fetchAPIOneProduct = async () => {
      try {
        const dataOneProduct = await ProductService.getOneProduct(id);

        if (dataOneProduct.data) {
          const product = dataOneProduct.data;
          // Đặt giá trị form
          await form.setFieldsValue(product);
          // Đặt hình ảnh nếu cần
          setImageList(product.image);
          // Cập nhật state sản phẩm
          setProduct(product);
        } else {
          console.error("Dữ liệu sản phẩm không tồn tại hoặc không hợp lệ");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gọi API:", error);
      }
    };

    fetchAPIOneProduct();
    fetchBrand()
    fetchCategory()
  }, [id, form]);

  const fetchCategory = async () => {
    const dataCategory = await CategoryService.getAllCategory()
    if (dataCategory && dataCategory.data && dataCategory.data.length > 0) {
      setListCategory(dataCategory.data)
    } else {
      console.log("Lấy danh mục thất bại hoặc không có danh mục nào!");
    }
  }

  const fetchBrand = async () => {
    const dataBrand = await BrandService.getAllBrand()
    if (dataBrand && dataBrand.data && dataBrand.data.length > 0) {
      setListBrand(dataBrand.data)
    } else {
      console.log("Lấy danh mục thất bại hoặc không có danh mục nào!");
    }
  }

  const handleUploadChange = (info) => {
    setImageEdit(info.fileList.map((file) => file.originFileObj)); // Chỉ giữ ảnh mới
  };

  const handleSubmitEdit = async (values) => {
    const formData = new FormData()

    for (let key in values) {
      formData.append(key, values[key]);
    }

    // Chỉ thêm ảnh mới nếu có ảnh được tải lên
    if (imageEdit.length > 0) {
      imageEdit.forEach((file) => {
        formData.append('image', file);
      });
    }

    try {
      const dataEditProduct = await ProductService.putProduct(id, formData);

      if (dataEditProduct && dataEditProduct.data && dataEditProduct.data.EC === 0) {
        showToastSuccess(dataEditProduct.data.message);
        navigate('/admin/product-admin')
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="edit-product">
      <h2>CHỈNH SỬA SẢN PHẨM</h2>
      {product && (
        <Form form={form} layout="vertical" onFinish={handleSubmitEdit}
        
        >
          <Form.Item
            labelCol={{ style: { fontWeight: 'bold' } }}
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thương Hiệu"
            labelCol={{ style: { fontWeight: 'bold' } }}
            name="brand_id"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Select placeholder="Chọn thương hiệu">
              {listBrand && listBrand.length > 0 ? (
                listBrand.map((bra) => (
                  <Select.Option key={bra.id} value={bra.id}>{bra.name}</Select.Option>
                ))
              ) : (
                <Select.Option value="">Không có thương hiệu nào</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Danh Mục"
            labelCol={{ style: { fontWeight: 'bold' } }}
            name="category_id"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select placeholder="Chọn danh mục">
              {listCategory && listCategory.length > 0 ? (
                listCategory.map((cate) => (
                  <Select.Option key={cate.id} value={cate.id}>{cate.name}</Select.Option>
                ))
              ) : (
                <Select.Option value="">Không có danh mục nào</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá:"
            labelCol={{ style: { fontWeight: 'bold' } }}
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <Input
              type="number"
              onWheel={(e) => e.target.blur()}
            />
          </Form.Item>

          <Form.Item
            label="Giá Khuyến Mãi:"
            labelCol={{ style: { fontWeight: 'bold' } }}
            name="promotion_price"
            rules={[{ required: true, message: "Vui lòng nhập giá khuyễn mãi!" }]}
          >
            <Input
              type="number"
              onWheel={(e) => e.target.blur()}
            />
          </Form.Item>

          <Form.Item
            label="Số Lượng Sản Phẩm:"
            labelCol={{ style: { fontWeight: 'bold' } }}
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng sản phẩm!" }]}
          >
            <Input
              type="number"
              onWheel={(e) => e.target.blur()}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả:"
            name="description"
            labelCol={{ style: { fontWeight: 'bold' } }}
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <CKEditor
              editor={ClassicEditor}
              data={product.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ description: data });
              }}
            />
          </Form.Item>


          <Form.Item
            label="Hình ảnh:"
            labelCol={{ style: { fontWeight: 'bold' } }}
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              listType="picture"
              onChange={handleUploadChange}
              accept="image/*"
              beforeUpload={() => false} // Ngăn không cho tải lên tự động
              multiple
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>

            {imageList.length > 0 && (
              <div className="image-preview">
                {imageList.map((img, index) => (
                  <img
                    key={index}
                    src={import.meta.env.VITE_API_URL + '/uploads/' + img}
                    title={img}
                    style={{ width: "100px", margin: "10px" }}
                  />
                ))}
              </div>
            )}
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%', fontSize: '20px', padding: '20px 0' }}
          >
            Cập nhật
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
