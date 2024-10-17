import './Cart.css'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


const Cart = () => {
  return (
    <div className='Cart'>
        <div className='name-cart'>
          <img src="../src/assets/images/logo_cart.png" alt="" />
          <div><p className="name">Giỏ Hàng</p></div>
          </div>
        <div className="item-tong-cart">
          <div className="item">
            <div className="item-cart">
                <div className="img">
                  <img src="../src/assets/images/item-Cart.png" alt="" />
                </div>
                <div className="name-item">
                <p className='item-name'>Tai nghe Edifier W830BT</p>
                <p className='item-coler'>Màu : Xám </p>
                <p className='item-price'>4.350.000₫</p>
                </div>
                <div className="remove">
                <p className='xoa' onClick>x</p>
                <div className='quantity'>
                <button className='btn-left'>-</button> 1 <button className='btn-right'>+</button>
                </div>
                </div>
              </div>
              
              <Link to={'/'}><div className="home-page">
                <div className='icon' size='1em'>
                  <AiOutlineArrowLeft className='icon-large'/>
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
                  <p className='total-item'>4.350.000Đ</p>
                </div>
                <div className="total">
                <p>Thành tiền:</p>
                <p className='total-item'>4.350.000Đ</p>
                </div>
                <button className='bnt-thanhtoan' >Thanh toán</button>
            </div>
        </div>
    </div>
  )
}

export default Cart
