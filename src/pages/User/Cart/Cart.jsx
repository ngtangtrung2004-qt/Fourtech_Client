import './Cart.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiFillDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useContext, useEffect } from "react";
import { UserContext } from '../../../components/context/authContext';
import { CartContext } from '../../../components/context/CartContext';
import CartService from '../../../services/cartService';
import { formatCurrency } from '../../../config/config';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { cart, setCart, updateCart } = useContext(CartContext);
  const { id } = useParams();

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigate('/login-register');
    }
  }, [user, navigate]);

  // Lấy giỏ hàng
  useEffect(() => {
    const fetchCart = async () => {
      const dataCart = await CartService.getCart(id);
      if (dataCart && dataCart.EC === 0) {
        setCart(dataCart.data || []); // Đảm bảo cart là một mảng hợp lệ
      }
    };
    fetchCart();
  }, [id, setCart]);


  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (productId) => {
    const cartItem = cart.find(item => item.productData.id === productId)

    if (!cartItem) {
      return
    }

    const cartId = cartItem.cart_id

    const response = await CartService.deleteCartItem(cartId, productId)

    if (response && response.EC === 0) {
      setCart(response.data);
    }
  };

  // Tăng/giảm số lượng
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1

    try {
      // Gửi yêu cầu cập nhật số lượng lên server
      const response = await CartService.postCart({
        user_id: id,
        product_id: productId,
        quantity: newQuantity,
      });

      if (response && response.EC === 0) {
        // Cập nhật giao diện nếu server trả về thành công
        const updatedCart = cart.map(item => {
          if (item.productData.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCart(updatedCart);
        updateCart(updatedCart); // Cập nhật CartContext
      } else {
        // console.error(response?.message || "Lỗi khi cập nhật số lượng");
      }
    } catch (error) {
      // console.error("Lỗi khi gọi API cập nhật giỏ hàng:", error);
    }
  };

  const getProductPrice = (item) => {
    return item?.productData?.promotion_price > 0
      ? item?.productData?.promotion_price
      : item?.productData?.price;
  };

  // Tính tổng giá trị
  const totalPrice = Array.isArray(cart)
    ? cart.reduce((total, item) => total + getProductPrice(item) * item.quantity, 0)
    : 0;

  return (
    <div className="Cart">
      {user && user.isAuthenticated ? (
        <>
          <div className="name-cart">
            <img src="../src/assets/images/logo_cart.png" alt="logo" />
            <hr />
            <p className="name">GIỎ HÀNG</p>
          </div>

          <div className="item-tong-cart">
            <div className="item">
              {cart && cart.length > 0 ? (
                cart.map((item, index) => (
                  <div className="item-cart" key={index}>
                    <div className="check-box">
                      {/* <input type="checkbox" /> */}
                    </div>

                    <div className="img">
                      <Link to={`/productDetail/${item?.productData?.id}`}>
                        {item?.productData?.image[0] && (
                          <img
                            style={{ width: '70px', height: '70px' }}
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item?.productData?.image[0]}`}
                            alt={item?.productData?.name}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="name-item">
                      <Link to={`/detail/${item?.productData?.id}`}>
                        <p className="item-name" title={item?.productData?.name}>
                          {item?.productData?.name}
                        </p>
                      </Link>
                      {item?.productData?.promotion_price > 0 ? (
                        <>
                          <del style={{ fontSize: '13px', textDecorationLine: 'line-through' }}>
                            {formatCurrency(item?.productData?.price)}
                          </del>
                          <p className="item-price">{formatCurrency(item?.productData?.promotion_price)}</p>
                        </>
                      ) : (
                        <p className="item-price">{formatCurrency(item?.productData?.price)}</p>
                      )}
                    </div>

                    <div className="action">
                      <div className="xoa" onClick={() => handleRemoveItem(item?.productData?.id)}>
                        <AiFillDelete />
                      </div>
                      <div className="quantity">
                        <AiOutlineMinus
                          className="btn-left"
                          onClick={() => handleUpdateQuantity(item?.productData?.id, item?.quantity - 1)}
                        />
                        <span>{item?.quantity}</span>
                        <AiOutlinePlus
                          className="btn-right"
                          onClick={() => handleUpdateQuantity(item?.productData?.id, item?.quantity + 1)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="ght">Giỏ hàng của bạn đang trống.</p>
              )}

              <div className="home-page">
                <Link to="/">
                  <div className="icon">
                    <AiOutlineArrowLeft className="icon-large" />
                  </div>
                  <div className="btn-home">
                    <button>Tiếp tục mua hàng</button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="tong-cart">
              <div className="provisional">
                <p>Tạm tính:</p>
                <p className="total-item">{formatCurrency(totalPrice)}</p>
              </div>
              <div className="total">
                <p>Thành tiền:</p>
                <p className="total-item-thanh-tien">{formatCurrency(totalPrice)}</p>
              </div>
              <Link to="/pay">
                <button className="bnt-thanhtoan">Thanh toán</button>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Cart;
