import { useContext } from 'react';
import './Item_Mouse.css'
import { CartContext } from '../CartContext/CartContext';



const products_1 = [
  {
    id: 13,
    name: 'Chuột Rapoo VT9 Air',
    image: '../chuot.png', // đường dẫn ảnh của sản phẩm
    price: 990000,
    originalPrice: 4690000,
    discount: '-20%',
  },
  {
      id: 14,
      name: 'Chuột Rapoo VT9 Air',
      image: '../chuot.png', // đường dẫn ảnh của sản phẩm
      price: 990000,
      originalPrice: 1100000,
      discount: '-20%',
    },
    {
      id: 15,
      name: 'Chuột Rapoo VT9 Air',
      image: '../chuot.png', // đường dẫn ảnh của sản phẩm
      price: 990000,
      originalPrice: 1100000,
      discount: '-20%',
    },
    {
      id: 16,
      name: 'Chuột Rapoo VT9 Air',
      image: '../chuot.png', // đường dẫn ảnh của sản phẩm
      price: 990000,
      originalPrice: 1100000,
      discount: '-20%',
    },
  // Có thể thêm các sản phẩm khác ở đây
];
const Item_Mouse = () => {
  const { addToCart } = useContext(CartContext);


  return (
    <>  
        
            <div className="products_1">
            {products_1.map((products_1) => (
                <ul className="productItem_1"  key={products_1.id}>
                    <li className="item_1">
                        <a href="">
                            <img src={products_1.image} alt={products_1.name} />
                        </a>
                        <div className="productDescription_1">
                            <p>{products_1.name}</p>
                        </div>
                        <div className="productPricing_1">
                            <span className="price_1">{products_1.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <span className="tag_1">{products_1.discount}</span>
                        </div>
                        <div className="productPricing-12">{products_1.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        <button className="add-to-cart-btn_1" onClick={() => addToCart(products_1)}>Thêm vào giỏ hàng</button>
                    </li>
                    
                </ul>
            ))}
            
            </div>
        
    </>
  )
}


export default Item_Mouse
