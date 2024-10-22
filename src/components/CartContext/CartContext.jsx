import { createContext, useState,  useMemo } from 'react';


// Tạo context để chia sẻ dữ liệu giỏ hàng giữa các component
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  // State để lưu trữ các sản phẩm trong giỏ hàng
  const [cart, setCart] = useState([]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
   // Hàm thêm sản phẩm vào giỏ hàng, hoặc tăng số lượng nếu sản phẩm đã tồn tại
  setCart((prevCart) => {
    const productExists = prevCart.find(item => item.id === product.id);
    if (productExists) {
      return prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};
// Hàm giảm số lượng sản phẩm trong giỏ hàng
const decreaseQuantity = (productId) => {
  setCart((prevCart) =>
    prevCart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};


  // Hàm xóa sản phẩm khỏi giỏ hàng theo id sản phẩm
  const removeFromCart = (productId) => {
  // Cập nhật state `cart` bằng cách lọc bỏ sản phẩm có `id` khớp với `productId`
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartQuantity = useMemo(() => cart.length, [cart]);
  // `useMemo` đảm bảo rằng giá trị này chỉ được tính lại khi `cart` thay đổi


  return (
    // Chia sẻ các hàm và dữ liệu giỏ hàng thông qua CartContext
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};