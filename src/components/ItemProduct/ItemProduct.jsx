import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext'
import './ItemProduct.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const products = [ // Danh sách sản phẩm giả lập với các thuộc tính như id, name, image, price, originalPrice và discount.
  {
    id: 1,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-1.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 2,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-2.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 3,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-3.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 4,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-4.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },

  {
    id: 5,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-4.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 6,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-2.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 7,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-3.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 8,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-1.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 9,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-3.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 10,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-1.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 11,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-2.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  {
    id: 12,
    name: 'Bàn phím cơ Keychron K1 Pro',
    image: '../hp-4.png', // đường dẫn ảnh của sản phẩm
    price: 4590000,
    originalPrice: 4690000,
    discount: '-3%',
  },
  // Thêm nhiều sản phẩm khác nếu có

];



const ItemProduct = () => {
  const { addToCart } = useContext(CartContext);

  const [currentIndex, setCurrentIndex] = useState(0);// Khởi tạo state để theo dõi vị trí sản phẩm đang hiển thị (bắt đầu từ 0).

  const itemsPerPage = 4;// Số lượng sản phẩm hiển thị mỗi trang.

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


  return (
    <>



      <div className="itemProduct-container" >

        {visibleProducts.map((products) =>

          <div key={products.id} className="itemProduct">
            <Link to={'/detail'}>
              <div className="product-img">
                <img src={products.image} alt="" />
              </div>
              <div className="product-description">
                <p>{products.name}</p>
              </div>
              <div className="product-pricing">
                <span className="price">{products.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <span className="tag">{products.discount}</span>
              </div>
              <div className="product-pricing-1">{products.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
            </Link>
            <button className="add-to-cart-btn" onClick={() => addToCart(products)}>Thêm vào giỏ hàng</button>

          </div>
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
