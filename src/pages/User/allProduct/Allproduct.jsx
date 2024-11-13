import { useState } from 'react'
import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import Category from '../../../components/Category/Category';
const AllProduct = () => {

  const [activeFilter, setActiveFilter] = useState('');


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
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            <li className="item-1">
              <a href="">
                <img src="../src/assets/images/sp-1.png" alt="" />
              </a>
              <div className="product-description-12">
                <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
              </div>
              <div className="product-pricing-12">
                <span className="price-12">3.600.000₫</span>
                <span className="tag-12">20%</span>
              </div>
              <div className="product-pricing-123">4.500.000₫</div>
              <button className="add-to-cart-btn-12">Thêm vào giỏ hàng</button>
            </li>
            
          </ul>
        </div>
            <div className="filter-section">
              <div className="filter-group">
                <h3>Hãng sản xuất</h3>
                {['Acer', 'Apple', 'Asus', 'Dell', 'Logitech','Corsair','Sony','Razer','Keychron','HyperWork','Logitech','Valve','Intel','Herman Miller','Fnatic'].map((bran, index) => (
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

export default AllProduct