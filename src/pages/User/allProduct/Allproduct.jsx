import { useContext, useState } from 'react'

import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import { CartContext } from '../../../components/CartContext/CartContext';
import Category from '../../../components/Category/Category';



const AllProduct = () => {
  
  const { addToCart } = useContext(CartContext);
  const [activeFilter, setActiveFilter] = useState('');

  
  const AllProducts = [
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

    // Thêm các sản phẩm khác nếu cần
];


  
const filters = [
    { key: 'giaTangDan', label: 'Giá tăng dần' },

   
 {key: 'giaGiamDan', label: 'Giá giảm dần' }, 

  
   {key: 'moiNhat', label: 'Mới nhất' }
  ];
  
  
  

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
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={activeFilter === filter.key ? 'active' : ''}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>

      <div className="all-product">
        <div className="item-products">
        <ul className="product-all-item">
          {AllProducts.map((product_2) => (
            <li key={product_2.id} className="item-1">
                <a href="">
                  <img src={product_2.image} alt="" />
                </a>
                <div className="product-description-12">
                    <p>{product_2.name}</p>
                </div>
                <div className="product-pricing-12">
                  <span className="price-12">{product_2.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  <span className="tag-12">{product_2.discount}</span>
                </div>
                <div className="product-pricing-123">{product_2.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div> <button className="add-to-cart-btn-12"  onClick={() => addToCart(product_2)}>Thêm vào giỏ hàng</button>
            </li>
          ))}
        </ul>
        </div>
            <div className="filter-section">
              <div className="filter-group">
                <h3>Hãng sản xuất</h3>
                {['Acer', 'Apple', 'Asus', 'Dell', 'Logitech','Corsair','Sony','Razer','Keychron'].map((bran, index) => (
                  <div key={index} className="filter-item">
                    <input type="checkbox" id={bran} />
                    <label htmlFor={bran}>{bran}</label>
                  </div>
                ))}
              </div>
            <div >
            </div>
            
            <hr className="divider" />
                  <div className="filter-group">
              <h3>Loại sản phẩm</h3>
              {['Bàn nâng hạ', 'Laptop','Chuột không dây','Ghế công thái học','Điện thoại','Tai nghe','Máy chơi game'
                ,'Máy tính (PC)','Máy tính bảng',
              ].map((tag, index) => (
                <div key={index} className="filter-item">
                  <input type="checkbox" id={tag} />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              ))}
            </div>
            <hr className="divider" />
                  <div className="filter-group">
              <h3>Giá</h3>
              {['Giá dưới 1.000.000₫', '1.000.000₫ - 2.000.000₫','2.000.000₫ - 3.000.000₫',
              '3.000.000₫ - 5.000.000₫','5.000.000₫ - 7.000.000₫','7.000.000₫ - 10.000.000₫','Giá trên 10.000.000₫',].map((tag, index) => (
                <div key={index} className="filter-item">
                  <input type="checkbox" id={tag} />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              ))}
            </div>
          </div>
            </div>
            <div className="pagination">
                  <button>&lt;</button>
                  <button className="active">1</button>
                  <button>2</button>
                   <button>3</button>
                   <button>4</button>
                      <button>5</button>
                     <button>&gt;</button>
                     
</div>
             <Category></Category>
        </div>
        </>
    )
}

export default AllProduct;