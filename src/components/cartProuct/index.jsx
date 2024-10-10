import './cart.css'
function CartProduct() {
  return (
    <>
      <div className="header-pk">
        <div className="header-link">
          <h4>Phụ kiện chơi game</h4>
          <div className="nav-pk">
            <a href="#">Máy chơi game</a>/ <a href="#">Tai nghe</a>/
            <a href="#"> Phụ kiện</a>
          </div>
        </div>
        <a href="#" className="view-more">Xem thêm </a>
      </div>

      <div className="products-item">
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition 
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition 
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition 
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img src="../../../public/anh1.jpg" alt="PS5 Standard Edition" />
          <div className="product-content-n">
            <div className="product-name">
              <p>
                Máy chơi game Sony PlayStation 5 (PS5) Standard Edition 
              </p>
            </div>
            <div className='price-section'>
              <div>
                <p className="price">15.900.000 Đ</p>
                <p className="old-price">17.900.000 Đ</p>
              </div>

              <div className="discount">16%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="logo-grid">
        <div className="logo-card"><img src="../../assets/images/acer-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/Dell-log.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/iphon-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/msi-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/samsung-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/Dell-log.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/msi-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/samsung-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/acer-logo.png" alt="Sony"/></div>
        <div className="logo-card"><img src="../../assets/images/iphon-logo.png" alt="Sony"/></div>
      </div>
      <div className="header-pk">
        <div className="header-link">
          <h4>Bảng tin công nghệ</h4>
        </div>
        <a href="#" className="view-more">Xem thêm </a>
      </div>

    </>
  );
}

export default CartProduct;