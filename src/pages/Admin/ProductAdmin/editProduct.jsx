import  { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import './product.css';

const EditProduct = () => {
  const [form] = Form.useForm();
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
   const [imageList, setImageList] = useState([]); // Danh sách hình ảnh

  // Giả lập việc lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    // Thay thế bằng API thực tế để lấy dữ liệu sản phẩm
    const fetchProduct = async () => {
      const fetchedProduct = {
        id: productId,
        name: 'iPhone 16 Pro',
        description: 'Vỏ titan, màn hình Super Retina XDR OLED 6.3 inch.',
        price: '26.000.000 đ',
         images: [
          '../../../../public/anh1.jpg',
          '../../../../public/anh1.jpg'
        ]
      };
      setProduct(fetchedProduct);
      form.setFieldsValue(fetchedProduct);
      setImageList(fetchedProduct.images);
    };

    fetchProduct();
  }, [form, productId]);
const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      // Giả lập việc nhận URL của hình ảnh đã tải lên
      setImageList((prev) => [...prev, URL.createObjectURL(info.file.originFileObj)]);
      message.success(`${info.file.name} tải lên thành công!`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };
  const onFinish = (values) => {
    console.log('Updated Product:', values);
    message.success('Cập nhật sản phẩm thành công!');
    // Gửi dữ liệu đến máy chủ hoặc cập nhật trạng thái ở đây
  };

  return (
    <div className="edit-product">
      <h2>Chỉnh sửa sản phẩm</h2>
      {product && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Hình ảnh">
            <Upload
              listType="picture"
              onChange={handleUploadChange}
              beforeUpload={() => false} // Ngăn không cho tải lên tự động
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
            {imageList.length > 0 && (
              <div className="image-preview">
                {imageList.map((img, index) => (
                  <img key={index} src={img} alt={`Product image ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
                ))}
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
