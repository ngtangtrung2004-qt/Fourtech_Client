import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import { CartContext } from '../../../components/context/CartContext';
import Category from '../../../components/Category/Category';
import ProductService from '../../../services/productService';
import { formatCurrency } from '../../../config/config';
import CartService from '../../../services/cartService';
import { UserContext } from '../../../components/context/authContext';
import { showToastError } from '../../../config/toastConfig';
import CategoryService from '../../../services/categoryService';


const AllProduct = () => {
  const [products, setProducts] = useState([]); // Tất cả sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const itemsPerPage = 20; // Số sản phẩm mỗi trang
  const { cart, setCart, updateCart, setTotalQuantity } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const location = useLocation(); // Lấy thông tin từ URL
  const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục được chọn
  const [selectedPriceRange, setSelectedPriceRange] = useState([]); // Các mức giá đã chọn
  const userId = user?.account?.id || null;

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchAPICategory = async () => {
      try {
        const dataCategory = await CategoryService.getAllCategory();
        setCategories(dataCategory.data); // Lưu danh mục vào state
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
      }
    };

    fetchAPICategory();
  }, []);

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const fetchAPIAllProduct = async () => {
      try {
        const dataProduct = await ProductService.getAllProduct();
        setProducts(dataProduct); // Lưu tất cả sản phẩm
        setFilteredProducts(dataProduct); // Ban đầu hiển thị tất cả sản phẩm
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };

    fetchAPIAllProduct();
  }, []);

  // Theo dõi URL và lấy danh mục từ query params
  useEffect(() => {
    const params = new URLSearchParams(location.search); // Lấy query params từ URL
    const categoryFromUrl = params.get('category'); // Lấy giá trị category từ URL

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl); // Cập nhật danh mục
    } else {
      setSelectedCategory(''); // Nếu không có category, hiển thị tất cả sản phẩm
    }
  }, [location.search]);


  // Lọc sản phẩm theo danh mục
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_name === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Nếu không có danh mục, hiển thị tất cả sản phẩm
    }
    setCurrentPage(1); // Đặt lại trang về 1 khi danh mục thay đổi
  }, [selectedCategory, products]);

  // Cuộn mượt mà khi chuyển trang
  useEffect(() => {
    const middlePosition = window.innerHeight / 2; // Tính vị trí giữa của màn hình
    window.scrollTo({
      top: middlePosition, // Đặt vị trí giữa
      behavior: "smooth", // Thêm hiệu ứng cuộn mượt mà
    });
  }, [currentPage]);


  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAddToCart = async (idProduct) => {
    if (!user || !user.isAuthenticated) {
      showToastError('Vui lòng đăng nhập');
      return;
    }

    try {
      const quantity = 1;
      const cartItems = cart;
      const existingCartItem = cartItems.find((item) => item.product_id === idProduct);

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        cartItems.push({ product_id: idProduct, quantity });
      }

      setCart(cartItems);
      const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      setTotalQuantity(newTotalQuantity);

      const dataCart = await CartService.postCart({
        user_id: userId,
        product_id: idProduct,
        quantity,
      });

      if (dataCart?.EC === 0) {
        updateCart(cartItems);
      } else {
        console.error(dataCart.message || 'Không thể thêm sản phẩm vào giỏ hàng');
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
  }


// Lọc sản phẩm theo các lựa chọn của người dùng
useEffect(() => {
  let filtered = [...products];

  // Lọc theo danh mục nếu có
  if (selectedCategory) {
    filtered = filtered.filter((product) => product.category_name === selectedCategory);
  }

  // Lọc theo giá
  if (selectedPriceRange.length > 0) {
    filtered = filtered.filter((product) => {
      const effectivePrice = product.promotion_price > 0 ? product.promotion_price : product.price;
      return selectedPriceRange.some((range) => {
        switch (range) {
          case 'Giá dưới 1.000.000₫':
            return effectivePrice < 1000000;
          case '1.000.000₫ - 2.000.000₫':
            return effectivePrice >= 1000000 && effectivePrice <= 2000000;
          case '2.000.000₫ - 3.000.000₫':
            return effectivePrice >= 2000000 && effectivePrice <= 3000000;
          case '3.000.000₫ - 5.000.000₫':
            return effectivePrice >= 3000000 && effectivePrice <= 5000000;
          case '5.000.000₫ - 7.000.000₫':
            return effectivePrice >= 5000000 && effectivePrice <= 7000000;
          case '7.000.000₫ - 10.000.000₫':
            return effectivePrice >= 7000000 && effectivePrice <= 10000000;
          case 'Giá trên 10.000.000₫':
            return effectivePrice > 10000000;
          default:
            return false;
        }
      });
    });
  }

  setFilteredProducts(filtered);
  setCurrentPage(1); // Đặt lại trang về 1 khi lọc
}, [selectedCategory, selectedPriceRange, products]);


  // Các hàm xử lý thay đổi lựa chọn lọc
  const handlePriceChange = (event) => {
    const { id, checked } = event.target;
    setSelectedPriceRange((prevRanges) => {
      if (checked) {
        return [...prevRanges, id];
      } else {
        return prevRanges.filter((range) => range !== id);
      }
    });
  };


  //Tính % giá giảm
  function calculateDiscount(originalPrice, discountedPrice) {
    const discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercent); // Làm tròn kết quả
  }


  return (
    <>
      <div className="container-allproduct">
        <div className="banner">
          <img src="collection-banner.webp" alt="" />
        </div>
        <Voucher />
        <div className="product-filter">
          <h2 className="product-title">
            {selectedCategory ? `Tất cả sản phẩm : ${selectedCategory}` : 'Tất cả sản phẩm'}
          </h2>
          {/* <div className="filter-buttons">

          </div> */}
        </div>

        <div className="all-product">
          <div className="item-products">
            <ul className="product-all-item">
              {productsToDisplay.map((products) => (
                <li key={products.id} className="item-1">
                  <Link to={`/productDetail/${products.id}`}>
                    {products?.image[0] && (
                      <img
                        className='imgproduct' src={`${import.meta.env.VITE_API_URL}/uploads/${products?.image[0]}`} alt={products.name} />
                    )}

                    <div className="product-description-12">
                      <p title={products.name}>{products.name}</p>
                    </div>
                    {products?.promotion_price === 0 ?
                      (
                        <div className="product-pricing-12">
                          <span className="price-12" style={{ marginTop: '20px' }}>{formatCurrency(products.price)}</span>
                        </div>
                      )
                      :
                      (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                            <div className="product-pricing-123">{formatCurrency(products.price)}</div>
                            <span className="tag_1">
                              {`-${calculateDiscount(products.price, products.promotion_price)}%`}
                            </span>
                          </div>
                          <div className="product-pricing-12">
                            <span className="price-12">{formatCurrency(products.promotion_price)}</span>
                          </div>
                        </>
                      )
                    }
                  </Link>
                  <button className="add-to-cart-btn-12" onClick={() => handleAddToCart(products.id)}>
                    Thêm vào giỏ hàng
                  </button>
                </li>
              ))}
            </ul>


            {/* Có thể dùng prop như thế này cho gọn code  */}
            {/* <Product_item data={pro}></Product_item> */}


          </div>
          <div className="filter-section">
            <div className="filter-group">
              <h3>Giá</h3>
              {['Giá dưới 1.000.000₫', '1.000.000₫ - 2.000.000₫', '2.000.000₫ - 3.000.000₫',
                '3.000.000₫ - 5.000.000₫', '5.000.000₫ - 7.000.000₫', '7.000.000₫ - 10.000.000₫', 'Giá trên 10.000.000₫',].map((tag, index) => (
                  <div key={index} className="filter-item">
                    <input name='xét giá'
                      type="checkbox"
                      id={tag}
                      onChange={handlePriceChange} />
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