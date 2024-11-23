import { createContext, useContext, useEffect, useState } from 'react';
import CartService from '../../services/cartService';
import { UserContext } from './authContext';

// Tạo context để chia sẻ dữ liệu giỏ hàng giữa các component
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State để lưu trữ các sản phẩm trong giỏ hàng
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { user } = useContext(UserContext);

  // Lấy ID người dùng từ `user` khi đã đăng nhập
  const userId = user?.account?.id;

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Hàm cập nhật giỏ hàng
  const updateCart = (newCart) => {
    setCart(newCart);
    // Cập nhật totalQuantity khi cart thay đổi
    const newTotalQuantity = newCart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  };

  useEffect(() => {
    // Tính toán lại tổng số lượng mỗi khi giỏ hàng thay đổi
    const newTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  }, [cart]);

  // Hàm lấy giỏ hàng từ API
  const fetchCart = async (id) => {
    if (!id) return; // Nếu không có ID, không gọi API
    try {
      const response = await CartService.getCart(id);
      if (response && response.EC === 0) {
        setCart(response.data || []); // Đảm bảo `cart` luôn là một mảng
      } else {
        console.error(response.message || "Lỗi khi lấy giỏ hàng");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API giỏ hàng:", error);
    }
  };

  // Gọi API lấy giỏ hàng khi `userId` thay đổi
  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    } else {
      setCart([])
    }
  }, [userId]);

  return (
    // Chia sẻ các hàm và dữ liệu giỏ hàng thông qua CartContext
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateCart,
        totalQuantity,
        setTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
