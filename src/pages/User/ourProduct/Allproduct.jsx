import { useState } from 'react'
import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
const AllProduct = () => {
    const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }
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
        </>
    )
}

export default AllProduct