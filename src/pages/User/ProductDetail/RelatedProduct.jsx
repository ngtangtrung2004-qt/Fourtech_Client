import PropTypes from "prop-types";
import "./DetailPrd.css";
import { formatCurrency } from "../../../config/config";
import { Link } from "react-router-dom";
function RelatedProduct({allProducts}) {
  console.log('tất cả sp',allProducts)
    return ( <>
    <div className="related_products">
              <h2 className="related_title">SẢN PHẨM KHÁC </h2>
              {allProducts.slice(0, 5).map((prd)=>(
                <div className="card_product" key={prd.id}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${prd.image[0]}`}
                  alt="san pham"
                />
                <div className="card_product-info">
                  <Link to={`/productDetail/${prd.id}`}>
                  <p className="card_product-info-name">{prd.name} </p>
                  </Link>
                  <p className="card_product-info-price-old">{formatCurrency(prd.price)}</p>
                  <div className="info-name-ation">
                    <p className="card_product-info-name-new">{formatCurrency(prd.promotion_price)}</p>
                    <button className=" btn-card-prd">Mua ngay</button>
                  </div>
                </div>
              </div>
              ))}
              <div className="btn-container">
    {allProducts.length > 5 && (
  <div className="btn-container">
    <Link to={'/allproduct'}>
    <button className="detail-button">Xem thêm sản phẩm</button>
    </Link>
  </div>
)}
  </div>
            </div>
    </> );
}
RelatedProduct.propTypes = {
  allProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      promotion_price: PropTypes.number, // Có thể không bắt buộc
      image: PropTypes.arrayOf(PropTypes.string).isRequired, // Mảng các chuỗi
    })
  ),
};

export default RelatedProduct;