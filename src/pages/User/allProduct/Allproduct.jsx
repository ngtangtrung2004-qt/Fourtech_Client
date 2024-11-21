import { useContext, useEffect, useState } from 'react'

import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import { CartContext } from '../../../components/context/CartContext';
import Category from '../../../components/Category/Category';
import ProductService from '../../../services/productService';
import { formatCurrency } from '../../../config/config';
import CartService from '../../../services/cartService';
import { UserContext } from '../../../components/context/authContext';
import { showToastError } from '../../../config/toastConfig';
import { Link } from 'react-router-dom';



const AllProduct = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [pro, setAllProduct] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 9; // Số sản phẩm mỗi trang


  const { cart, setCart, updateCart, setTotalQuantity } = useContext(CartContext);
  const { user } = useContext(UserContext)

  const userId = user.account.id

  useEffect(() => {
    fetchAPIAllProduct()
  }, [])

  const fetchAPIAllProduct = async () => {
    const dataProduct = await ProductService.getAllProduct();
    console.log(dataProduct);
    setAllProduct(dataProduct);
  }


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

  const handleAddToCart = async (idProduct) => {

    if (user.isAuthenticated === false) {
      showToastError("Vui lòng đăng nhập")
    } else {
      try {
        //Xác định số lượng sản phẩm cần thêm vào giỏ hàng là 1
        const quantity = 1;

        // Lấy thông tin giỏ hàng từ context
        const cartItems = cart;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa. 
        //Tìm kiếm trong (mảng cartItems) xem có sản phẩm nào có product_id trùng với idProduct (ID của sản phẩm cần thêm vào giỏ hàng) không.
        //Nếu tìm thấy sản phẩm (existingCartItem), thì nó sẽ trả về sản phẩm đó, nếu không sẽ trả về undefined.
        const existingCartItem = cartItems.find(item => item.product_id === idProduct);

        if (existingCartItem) {
          // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
          //Nếu sản phẩm đã có trong giỏ hàng (existingCartItem), số lượng của sản phẩm này được tăng thêm
          existingCartItem.quantity += quantity;  // Tăng số lượng
        } else {
          // Thêm sản phẩm mới vào giỏ hàng
          //Nếu sản phẩm chưa có trong giỏ hàng (else), một đối tượng sản phẩm mới được thêm vào giỏ hàng với product_id là idProduct và số lượng là quantity.
          cartItems.push({
            product_id: idProduct,
            quantity: quantity
          });
        }

        // Cập nhật lại giỏ hàng trong context
        //Sau khi cập nhật hoặc thêm sản phẩm mới, hàm gọi setCart(cartItems) để cập nhật lại giỏ hàng trong context. 
        //Điều này sẽ làm cho các component khác sử dụng CartContext nhận được giỏ hàng mới
        setCart(cartItems);

        // Cập nhật lại tổng số lượng trong giỏ hàng
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        //Tính tổng số lượng sản phẩm trong giỏ hàng. Hàm reduce sẽ cộng dồn giá trị của thuộc tính quantity của mỗi sản phẩm trong giỏ hàng.

        // Cập nhật tổng số lượng sản phẩm trong giỏ hàng bằng newTotalQuantity
        setTotalQuantity(newTotalQuantity);

        // Gửi dữ liệu giỏ hàng lên server
        const dataCart = await CartService.postCart({
          user_id: userId,
          product_id: idProduct,
          quantity: quantity
        });

        if (dataCart && dataCart.EC === 0) {
          // Cập nhật lại cart và thông báo thành công
          updateCart(cartItems);
        } else {
          console.error(dataCart.message || 'Không thể thêm sản phẩm vào giỏ hàng');
        }
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.message);
      }
    }
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


  return (
    <>
      <div className="container-allproduct">
        <div className="banner">
          <img src="collection-banner.webp" alt="" />
        </div>
        <Voucher />
        <div className="product-filter">
          <h2 className="product-title">Tất cả các sản phẩm</h2>
          <div className="filter-buttons">

          </div>
        </div>

        <div className="all-product">
          <div className="item-products">
            <ul className="product-all-item">
              {productsToDisplay.map((products) => (
                <li key={products.id} className="item-1">
                  <Link to="">
                    {products?.image[0] && (
                      <img 
                      className='imgproduct' src={`${import.meta.env.VITE_API_URL}/uploads/${products?.image[0]}`} alt={products.name} />
                    )}
                    <div className="product-description-12">
                      <p>{products.name}</p>
                    </div>
                    <div className="product-pricing-12">
                      <span className="price-12">{formatCurrency(products.promotion_price)}</span>
                    </div>
                    <div className="product-pricing-123">{formatCurrency(products.price)}</div>
                    <button className="add-to-cart-btn-12" onClick={() => handleAddToCart(products.id)}>
                      Thêm vào giỏ hàng
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-section">
            <div className="filter-group">
              <h3>Hãng sản xuất</h3>
              {['Samsung', 'Acer', 'Apple', 'Asus', 'Dell', 'Logitech', 'Corsair', 'Sony', 'Razer', 'Keychron'].map((bran, index) => (
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
                , 'Máy tính (PC)', 'Máy tính bảng', 'Loa', 'Ghế'
              ].map((tag, index) => (
                <div key={index} className="filter-item">
                  <input name='xét soạn phẩm'
                    type="radio"
                    id={tag}
                    onChange={handleBrandFilterChange} />
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