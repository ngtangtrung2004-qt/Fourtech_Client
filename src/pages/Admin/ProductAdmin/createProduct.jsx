import { useEffect, useState } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import ProductService from "../../../services/productService";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../services/categoryService";
import BrandService from "../../../services/brandService";
import { showToastSuccess } from "../../../config/toastConfig";
function CreateProduct() {

  const navigate = useNavigate();

  const [formDataProduct, setFormDataProduct] = useState({
    name: "",
    category_id: "",
    brand_id: "",
    image: [],
    price: "",
    promotion_price: "",
    description: "",
    quantity: "",
  });

  // const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const dataCategory = await CategoryService.getAllCategory();
      if (dataCategory && dataCategory.data && dataCategory.EC === 0) {
        setCategories(dataCategory.data)
      }
    }

    fetchCategory()
  }, [])

  useEffect(() => {
    const fetchBrand = async () => {
      if (formDataProduct.category_id) {
        try {
          const dataBrand = await BrandService.getBrandsByCategory(formDataProduct.category_id);
          if (dataBrand && dataBrand.data && dataBrand.data.EC === 0 || dataBrand.data.data.length > 0) {
            setBrands(dataBrand.data.data);
          } else {
            setBrands([]);
          }
        } catch (error) {
          console.error("Không thể tìm được thương hiệu.", error);
        }
      } else {
        setBrands([]);
      }
    }

    fetchBrand()
  }, [formDataProduct.category_id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    // các dữ liệu khác
    setFormDataProduct({
      ...formDataProduct,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    // lưu file ảnh 
    setFormDataProduct({
      ...formDataProduct,
      image: Array.from(e.target.files), // Chuyển đổi FileList thành mảng
    });
  };
  // console.log(formDataProduct);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý form data ở đây, ví dụ: gửi dữ liệu đến API

    const formData = new FormData()
    formData.append('nameProduct', formDataProduct.name)
    formData.append('category_id', formDataProduct.category_id)
    formData.append('brand_id', formDataProduct.brand_id)
    formData.append('price', formDataProduct.price)
    formData.append('promotion_price', formDataProduct.promotion_price)
    formData.append('description', formDataProduct.description)
    formData.append('quantity', formDataProduct.quantity)
    formDataProduct.image.forEach(file => {
      formData.append('imageProduct', file);
    });

    const data = await ProductService.postProduct(formData)

    if (data && data.data && data.data.length > 0) {
      showToastSuccess(data.message);
      navigate('/admin/product-admin')
    }

    console.log(data);
  };
  return (
    <>
      <div className="product-form-container">
        <h2>THÊM MỚI SẢN PHẨM</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên Sản Phẩm</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formDataProduct.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Danh Mục Sản Phẩm</label>
            <select
              id="category_id"
              name="category_id"
              value={formDataProduct.category_id}
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cate) => (
                <option key={cate.id} value={cate.id}>{cate.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="brand_id">Thương Hiệu:</label>
            <select
              id="brand_id"
              name="brand_id"
              value={formDataProduct.brand_id}
              onChange={handleChange}
            >
              <option value="">Chọn thương hiệu</option>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))
              ) : (
                <option>Không có thương hiệu nào</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá Sản Phẩm</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formDataProduct.price}
              onChange={handleChange}
              placeholder="Nhập giá sản phẩm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="promotion_price">Giá Khuyến mãi</label>
            <input
              type="number"
              id="promotion_price"
              name="promotion_price"
              value={formDataProduct.promotion_price}
              onChange={handleChange}
              placeholder="Nhập giá khuyến mãi"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Số lượng sản phẩm</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formDataProduct.quantity}
              onChange={handleChange}
              placeholder="Nhập số lượng sản phẩm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Hình Ảnh Sản Phẩm</label>
            <label htmlFor="image" className="custom-file-upload">
              <FontAwesomeIcon icon={faCloudArrowUp} />
              Upload file
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              style={{ display: "none" }}
            />
            {/* {imagePreview && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            )} */}

            <div className="form-group">
              <label htmlFor="description">Mô Tả Sản Phẩm</label>
              <textarea
                id="description"
                name="description"
                value={formDataProduct.description}
                onChange={handleChange}
                rows="4"
                placeholder="Nhập mô tả sản phẩm"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Thêm Sản Phẩm
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
