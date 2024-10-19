import { Link } from 'react-router-dom'
import './ItemProduct.css'

const products = [
    {
      id: 1,
      name: 'Bàn phím cơ Keychron K1 Pro',
      image: '../public/hp-1.png', // đường dẫn ảnh của sản phẩm
      price: 4590000,
      originalPrice: 4690000,
      discount: '-3%',
    },
    {
        id: 2,
        name: 'Bàn phím cơ Keychron K1 Pro',
        image: '../public/hp-1.png', // đường dẫn ảnh của sản phẩm
        price: 4590000,
        originalPrice: 4690000,
        discount: '-3%',
      },
      {
        id: 3,
        name: 'Bàn phím cơ Keychron K1 Pro',
        image: '../public/hp-1.png', // đường dẫn ảnh của sản phẩm
        price: 4590000,
        originalPrice: 4690000,
        discount: '-3%',
      },
      {
        id: 4,
        name: 'Bàn phím cơ Keychron K1 Pro',
        image: '../public/hp-1.png', // đường dẫn ảnh của sản phẩm
        price: 4590000,
        originalPrice: 4690000,
        discount: '-3%',
      },

      {
        id: 5,
        name: 'Bàn phím cơ Keychron K1 Pro',
        image: '../public/hp-1.png', // đường dẫn ảnh của sản phẩm
        price: 4590000,
        originalPrice: 4690000,
        discount: '-3%',
      },
    // Thêm nhiều sản phẩm khác nếu có
  ];

const ItemProduct = () => {
    const Listproducts = products.slice(0, 4);
  return (
    <>

        <div className="itemProduct-container">
            {/* <Link to={'/detail'}> */} 
            {Listproducts.map((products) =>

            <div key={products.id} className="itemProduct">
                 <div className="product-img">
                        <img src={products.image} alt="" />
                    </div>
                    <div className="product-description">
                    <p>{products.name}</p>
                    </div>
                    <div className="product-pricing">
                        <span className="price">{products.price}</span>
                        <span className="tag">{products.discount}</span>
                    </div>
                    <div className="product-pricing-1">{products.originalPrice}</div>
                    <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>

            </div>
            )}
                </div>
            {/* </Link> */}
    </>
  )
}

export default ItemProduct
