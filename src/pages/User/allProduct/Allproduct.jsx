import { useContext, useState } from 'react'

import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import { CartContext } from '../../../components/CartContext/CartContext';



const AllProduct = () => {
  
  const { addToCart } = useContext(CartContext);
  const [showMore, setShowMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');

    const toggleShowMore = () => {setShowMore(!showMore);
      
  }
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
                <div className="product-pricing-123">{product_2.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                <button className="add-to-cart-btn-12"  onClick={() => addToCart(product_2)}>Thêm vào giỏ hàng</button>
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
                <button className="show-more-btn" onClick={toggleShowMore}>
                  {showMore ? 'Thu gọn ' : 'Xem thêm '}
                </button>
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
             <div className="product-grid">
                    <a href=''>
                        <div className="product-item">
                            <img src="laptop.webp" alt="Laptop" />
                            <p>Laptop</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="tablet.webp" alt="Máy tính bảng" />
                            <p>Máy tính bảng</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="phone.webp" alt="Điện thoại" />
                            <p>Điện thoại</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="headphone.webp" alt="Tai nghe" />
                            <p>Tai nghe</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="keyboard.webp" alt="Bàn phím" />
                            <p>Bàn phím</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="powerbank.webp" alt="Sạc dự phòng" />
                            <p>Sạc dự phòng</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="mouse.webp" alt="Chuột + Lót chuột" />
                            <p>Chuột + Lót chuột</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="charger.webp" alt="Củ sạc" />
                            <p>Củ sạc</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="pc.webp" alt="Máy tính bàn (PC)" />
                            <p>Máy tính bàn (PC)</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="monitor.webp" alt="Màn hình" />
                            <p>Màn hình</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="audio.webp" alt="Thiết bị âm thanh" />
                            <p>Thiết bị âm thanh</p>
                        </div>
                    </a>

                    <a href=''>
                        <div className="product-item">
                            <img src="playgame.webp" alt="Máy chơi game" />
                            <p>Máy chơi game</p>
                        </div>
                    </a>
                    <a href=''>
                        <div className="product-item">
                            <img src="cable.webp" alt="Cáp sạc" />
                            <p>Cáp sạc</p>
                        </div>
                    </a>
                    <a href=''>
                        <div className="product-item">
                            <img src="accessory.webp" alt="Phụ kiện" />
                            <p>Phụ kiện</p>
                        </div>
                    </a>
                </div>
        </div>
        </>
    )
}

export default AllProduct