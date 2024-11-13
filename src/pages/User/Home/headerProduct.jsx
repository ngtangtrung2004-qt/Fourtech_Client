import PropTypes from "prop-types";
import "./index.css"

function HeaderProduct({title}) {
    return ( <>
          <div className="header-pk">
        <div className="header-link">
          <h4>{title}</h4>
          
        </div>
        <a href="/Allproduct" className="view-more">Xem thêm </a>
      </div>
    </> );
}
HeaderProduct.propTypes = {
    title: PropTypes.string
  };
export default HeaderProduct;