// import HeaderProduct from '../../pages/User/Home/headerProduct';
import BrandService from '../../services/brandService';
import './itemAccessory.css'
import { useEffect, useState } from 'react';





function ItemAccessory() {
  // State để lưu danh sách thương hiệu
  const [brands, setBrands] = useState([]);

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchAPIBrand = async () => {
      try {
        const dataBrand = await BrandService.getAllBrand()
        setBrands(dataBrand.data); // Lưu danh mục vào state
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
      }
    };

    fetchAPIBrand();
  }, []);

  return (
    <>
      {/* <HeaderProduct title="Phụ kiện chơi game" />
      <div className="products-item">
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="logo-grid">
        {/* Duyệt qua các thương hiệu và hiển thị tối đa 10 thương hiệu */}
        {brands.slice(0, 10)?.map((brand, index) => (
          <div className="logo-card" key={index}>
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${brand.logo}`} alt={brand.name} />
          </div>
        ))}
      </div>


    </>
  );
}

export default ItemAccessory;