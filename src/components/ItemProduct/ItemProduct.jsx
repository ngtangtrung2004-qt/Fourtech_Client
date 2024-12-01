import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import './ItemProduct.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ProductService from '../../services/productService';
import { formatCurrency } from '../../config/config';
import { showToastError } from '../../config/toastConfig';
import { UserContext } from '../context/authContext';
import CartService from '../../services/cartService';




const ItemProduct = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext)
  const { cart, setCart, updateCart, setTotalQuantity } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0); // Khởi tạo state để theo dõi vị trí sản phẩm đang hiển thị (bắt đầu từ 0).
  const itemsPerPage = 5; // Số lượng sản phẩm hiển thị mỗi trang.

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProductByCategory(filter);
        if (data && data.EC === 0 && isMounted) {
          setProducts(data.data);
        } else if (isMounted) {
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm từ API:", error);
        if (isMounted) setProducts([]);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [filter]);


  const userId = user.account.id

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
  }


  const nextSlide = () => {
    if (currentIndex < products.length - itemsPerPage) { // Nếu còn sản phẩm chưa hiển thị.
      setCurrentIndex(currentIndex + itemsPerPage);    // Chuyển sang nhóm sản phẩm tiếp theo.
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) { // Nếu không phải nhóm đầu tiên.
      setCurrentIndex(currentIndex - itemsPerPage); // Quay lại nhóm sản phẩm trước đó.
    }
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage); // Lấy nhóm sản phẩm hiển thị dựa trên chỉ số hiện tại.

  //Tính % giá giảm
  function calculateDiscount(originalPrice, discountedPrice) {
    const discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercent); // Làm tròn kết quả
  }

  return (
    <>

      <div className="itemProduct-container">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((products) => (
            <div key={products.id} className="itemProduct">
              <Link to={`/productDetail/${products.id}`}>
                {products.image.slice(0, 1).map((imgSrc, index) => (
                  <img className='product-img' key={index} src={`${import.meta.env.VITE_API_URL}/uploads/${imgSrc}`} alt={products.name} />
                ))}
                <div className="product-description">
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
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(products.id)}>
                Thêm vào giỏ hàng
              </button>
            </div>
          ))
        ) : (
          <p className="no-products">Không có sản phẩm nào để hiển thị.</p>
        )}


      </div>

      <div className="buttons">
        <button className="left-arrow" onClick={prevSlide} disabled={currentIndex === 0}>
          <FaAngleLeft />
        </button>
        <button className="right-arrow" onClick={nextSlide} disabled={currentIndex >= products.length - itemsPerPage}>
          <FaAngleRight />
        </button>
      </div>
    </>
  )
}

export default ItemProduct


