import './Cart.css'
import { Link } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiFillDelete,
  AiOutlineMinus,
  AiOutlinePlus
} from "react-icons/ai";
import { useEffect, useContext } from "react";
import { CartContext } from '../../../components/CartContext/CartContext';

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext);


  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
  }, []);

  return (
    <div className='Cart'>
      <div className='name-cart'>
        <img src="../src/assets/images/logo_cart.png" alt="logo" />
        <hr />
        <p className="name">GIỎ HÀNG</p>
      </div>

      <div className="item-tong-cart">
        <div className="item">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="item-cart" key={item.id}>
              <div className='check-box'>
                <input type="checkbox" />
              </div>
              <div className="img" >
                <img style={{ width: '70px', height: '70px' }} src={item.image} alt={item.name} />
              </div>
              <div className="name-item">
                <p className='item-name' title={item.name}>{item.name}</p>
                <p className='item-coler'>Màu: Xám </p>
                <p className='item-price'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
              <div className="action">
                <div className='xoa' onClick={() => removeFromCart(item.id)}>
                  <AiFillDelete />
                </div>
                <div className='quantity'>
                  <AiOutlineMinus className='btn-left' onClick={() => decreaseQuantity(item.id)} />
                  <span>{item.quantity}</span>
                  <AiOutlinePlus className='btn-right'  onClick={() => addToCart(item)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Giỏ hàng của bạn đang trống.</p>
        )}

        <Link to={'/'}>
          <div className="home-page">
            <div className='icon' size='1em'>
              <AiOutlineArrowLeft className='icon-large' />
            </div>
            <div className="btn-home">
              <button>Tiếp tục mua hàng</button>
            </div>
          </div>
        </Link>
        </div>
      

      <div className="tong-cart">
        <div className="provisional">
          <p>Tạm tính:</p>
          <p className='total-item'>
          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </p>
        </div>
        <div className="total">
          <p>Thành tiền:</p>
          <p className='total-item-thanh-tien'>
          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </p>
        </div>
        <Link to={'/pay'}>
          <button className='bnt-thanhtoan'>Thanh toán</button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Cart
