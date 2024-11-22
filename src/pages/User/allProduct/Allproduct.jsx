import { useContext, useEffect, useState } from 'react'

import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import { CartContext } from '../../../components/CartContext/CartContext';
import Category from '../../../components/Category/Category';
import ProductService from '../../../services/productService';
import { formatCurrency } from '../../../config/config';
import ItemProduct from '../../../components/ItemProduct/ItemProduct';



const AllProduct = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [pro, setAllProduct] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 9; // Số sản phẩm mỗi trang

  useEffect(() => {
    fetchAPIAllProduct()
  }, [

  ])
  const fetchAPIAllProduct = async () => {
    const dataProduct = await ProductService.getAllProduct();
    console.log(dataProduct);
    setAllProduct(dataProduct);
  }

  const { addToCart } = useContext(CartContext);

  // Hàm xử lý khi thay đổi checkbox lọc giá
  const handlePriceFilterChange = (event) => {
  const { id, checked } = event.target;
  setSelectedPriceRanges((prevSelectedRanges) =>
    checked ? [...prevSelectedRanges, id] : prevSelectedRanges.filter((range) => range !== id)
  );
};
// Hàm lọc sản phẩm theo giá
const filterByPrice = (product) => {
  if (!selectedPriceRanges.length) return true;

  return selectedPriceRanges.some((range) => {
    const price = product.price; // Thay "product.price" nếu bạn lưu giá ở property khác
    switch (range) {
      case 'Giá dưới 1.000.000₫':
        return price < 1000000;
      case '1.000.000₫ - 2.000.000₫':
        return price >= 1000000 && price <= 2000000;
      case '2.000.000₫ - 3.000.000₫':
        return price > 2000000 && price <= 3000000;
      case '3.000.000₫ - 5.000.000₫':
        return price > 3000000 && price <= 5000000;
      case '5.000.000₫ - 7.000.000₫':
        return price > 5000000 && price <= 7000000;
      case '7.000.000₫ - 10.000.000₫':
        return price > 7000000 && price <= 10000000;
      case 'Giá trên 10.000.000₫':
        return price > 10000000;
      default:
        return false;
    }
  });
};

   // Hàm xử lý thay đổi của checkbox
   const handleBrandFilterChange = (event) => {
    const { id, checked } = event.target;
    setSelectedBrands((prevSelectedBrands) => 
      checked ? [...prevSelectedBrands, id] : prevSelectedBrands.filter((brand) => brand !== id)
    );
  };

  // Lọc sản phẩm dựa trên tên sản phẩm chứa từ khóa đã chọn
  const filteredProducts = selectedBrands.length
  ? pro.filter(
      (product) =>
        selectedBrands.some((brand) => product.name.includes(brand)) && filterByPrice(product)
    )
  : pro.filter(filterByPrice);

  //Tính toán các sản phẩm hiển thị trên trang hiện tại
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  //Xử lý chuyển trang
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Xử lý khi chọn checkbox hãng sản xuất
  

  return (
    <>
      <div className="container-allproduct">
        <div className="banner">
          <img src="collection-banner.webp" alt="" />
        </div>
        <Voucher />
        <div className="product-filter">
          <h2 className="product-title">Tất cả các sản phẩm {Category}</h2>
          <div className="filter-buttons">

          </div>
        </div>

        <div className="all-product">
          <div className="item-products"> 
            <ul className="product-all-item">
              {productsToDisplay.map((products) => (
                <li key={products.id} className="item-1">
                  <a href="">
                    {products.image.slice(0, 1).map((imgSrc, index) => (
                      <img className='imgproduct' key={index} src={`${import.meta.env.VITE_API_URL}/uploads/${imgSrc}`} alt={products.name} />
                    ))}
                  </a>
                  <div className="product-description-12">
                    <p>{products.name}</p>
                  </div>
                  <div className="product-pricing-12">
                    <span className="price-12">{formatCurrency(products.promotion_price)}</span>
                  </div>
                  <div className="product-pricing-123">{formatCurrency(products.price)}</div>
                  <button className="add-to-cart-btn-12" onClick={() => addToCart(products)}>
                    Thêm vào giỏ hàng
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-section">
            <div className="filter-group">
              <h3>Hãng sản xuất</h3>
              {['Samsung','Acer', 'Apple', 'Asus', 'Dell', 'Logitech', 'Corsair', 'Sony', 'Razer', 'Keychron'].map((bran, index) => (
                <div key={index} className="filter-item">
                  <input name='xét hãng sản phẩm'
                type="radio" 
                         id={bran}
                         onChange={handleBrandFilterChange} />
                  <label htmlFor={bran}>{bran}</label>
                </div>
              ))}
            </div>
            <div >
            </div>

            <hr className="divider" />
            <div className="filter-group">
              <h3>Loại sản phẩm</h3>
              {['Bàn nâng hạ', 'Laptop', 'Chuột không dây', 'Ghế công thái học', 'Điện thoại', 'Tai nghe', 'Máy chơi game'
                , 'Máy tính (PC)', 'Máy tính bảng','Loa','Ghế'
              ].map((tag, index) => (
                <div key={index} className="filter-item">
                  <input name='xét soạn phẩm'
                      type="radio" 
                      id={tag}
                      onChange={handleBrandFilterChange}/>
                  <label htmlFor={tag}>{tag}</label>
                  
                </div>
              ))}
            </div>
            <hr className="divider" />
            <div className="filter-group">
              <h3>Giá</h3>
              {['Giá dưới 1.000.000₫', '1.000.000₫ - 2.000.000₫', '2.000.000₫ - 3.000.000₫',
                '3.000.000₫ - 5.000.000₫', '5.000.000₫ - 7.000.000₫', '7.000.000₫ - 10.000.000₫', 'Giá trên 10.000.000₫',].map((tag, index) => (
                  <div key={index} className="filter-item">
                    <input name='xét giá'
                      type="radio" 
                      id={tag}
                      onChange={handlePriceFilterChange} />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
        <Category></Category>
      </div>
    </>
  )
}

export default AllProduct;