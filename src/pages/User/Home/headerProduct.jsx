import PropTypes from "prop-types";
import "./index.css"
import { Link } from "react-router-dom";

function HeaderProduct({title,url}) {
    return ( <>
          <div className="header-pk">
        <div className="header-link">
          <h4>{title}</h4>
          
        </div>
        <Link to={url} className="view-more">Xem thêm</Link>
      </div>
    </> );
}
HeaderProduct.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string
  };
export default HeaderProduct;