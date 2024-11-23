import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "./Caroucel";

import "./DetailPrd.css";
import {
  faCartShopping,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Collapse from "./collapse"
import RelatedProduct from "./RelatedProduct";
import { Link, useParams } from "react-router-dom";
import Comment from "./comment";
import { useEffect, useState } from "react";
import axios from "axios";import { formatCurrency } from "../../../config/config";
import ProductService from '../../../services/productService';

// import ProductInfo from "./collapse";

function ProductDetail() {
  const {id}= useParams();
  const [productDetail,setProductDetail]= useState([])
   const [allProduct, setAllProduct] = useState([]);

  

  useEffect(()=>{
    axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/${id}`,
        
      )
      .then((response) => setProductDetail(response.data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  },[id])
    useEffect(() => {
        const fetchAPIAllProduct = async () => {
    const dataProduct = await ProductService.getAllProduct();
    // console.log(dataProduct);
    setAllProduct(dataProduct);
  }
    fetchAPIAllProduct()
  }, [])

  console.log('id',typeof(id))
  return (
    <>
      <div className="main_detail">
        <div className="detail_info">
          <Carousel imageDetailPrd={productDetail.image || []}/>
          <div className="describe">
            <h2 className="describe_title">Tai nghe Edifier W830BT</h2> 
            <div className="describe_price">
              <h2 className="describe_price-new">{formatCurrency(productDetail.promotion_price)}</h2>
              <span className="describe_price-old"> {formatCurrency(productDetail.price)}</span>
            </div>
            <div className="describe_promotion">
              <p>Khuyến mãi nổi bật</p>
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Giảm ngay 5.000.000 áp dụng đến ngày 16/09
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Trả góp 0%
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Đổi trả miễn phí trong vòng 30 ngày
                </li>
              </ul>
            </div>
            <div className="escribe_quantity">
              <p>Số lượng:</p>
              <div className="counter">
                <button className="counter-btn minus">-</button>
                <span className="counter-value">1</span>
                <button className="counter-btn plus">+</button>
              </div>
            </div>
            <button className="btn_add_cart" >
              {" "}
              <span>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              Thêm vào giỏ hàng
            </button>
            <button className="btn_buy">
              <Link to={'/pay'}> Mua ngay</Link>
            </button>
          </div>
        </div>
        <div className="content_detail">
          <div className="detail_collapse">
            <Collapse title="Thông tin Sản phẩm" isOpenByDefault={true}>
              <p>
                {productDetail.description}
              </p>
            </Collapse>
            {/* <Collapse title="Đánh giá sản phẩm">
              <p>Nội dung của tiêu đề 2</p>
            </Collapse>
            <Collapse title="Tiêu đề 3">
              <p>Nội dung của tiêu đề 3</p>
            </Collapse> */}
            <Comment product_id={id}/>
          </div>
          <div className="detail_parameter">
          
            <RelatedProduct allProducts={allProduct || []}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
