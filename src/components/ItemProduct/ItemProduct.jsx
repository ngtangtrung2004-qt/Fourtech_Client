import './ItemProduct.css'



const ItemProduct = () => {
    return (
        <>
            <div className="itemProduct-container">
                <div className="itemProduct">
                    <a href=''>
                        <div className="product-img">
                            <img src='../public/bp1.png' alt="" />
                        </div>
                        <div className="product-description">
                            <p>Bàn Phím Cơ Không Dây Lofree Dot Foundation (giảm thêm 100k)</p>
                        </div>
                        <div className="product-pricing">
                            <span className="price">3.600.000₫</span>
                            <span className="tag">20%</span>
                        </div>
                        <div className="product-pricing-1">4.500.000₫</div>
                        <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
                    </a>
                </div>

                <div className="itemProduct">
                    <a href=''>
                        <div className="product-img">
                            <img src='../public/tn-1.png' alt="" />
                        </div>
                        <div className="product-description">
                            <p>Tai nghe không dây SENNHEISER Momentum 4 (giảm thêm 100k)</p>
                        </div>
                        <div className="product-pricing">
                            <span className="price">3.600.000₫</span>
                            <span className="tag">20%</span>
                        </div>
                        <div className="product-pricing-1">4.500.000₫</div>
                        <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
                    </a>
                </div>

                <div className="itemProduct">
                    <a href=''>
                        <div className="product-img">
                            <img src='../public/loa-1.png' alt="" />
                        </div>
                        <div className="product-description">
                            <p>Loa Bluetooth Rezo Play  IPX6 SOUNARC K2 (giảm thêm 100k)</p>
                        </div>
                        <div className="product-pricing">
                            <span className="price">3.600.000₫</span>
                            <span className="tag">20%</span>
                        </div>
                        <div className="product-pricing-1">4.500.000₫</div>
                        <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
                    </a>
                </div>

                <div className="itemProduct">
                    <a href=''>
                        <div className="product-img">
                            <img src='../public/tn-2.png' alt="" />
                        </div>
                        <div className="product-description">
                            <p>Tai nghe Belkin SoundForm Play AUC005btPK True Wireless Earbuds</p>
                        </div>
                        <div className="product-pricing">
                            <span className="price">3.600.000₫</span>
                            <span className="tag">20%</span>
                        </div>
                        <div className="product-pricing-1">4.500.000₫</div>
                        <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
                    </a>
                </div>
            </div>
        </>
    )
}

export default ItemProduct
