import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "./Caroucel";
// import React from 'react';
import { useEffect } from "react";

import "./DetailPrd.css";
import {
  faCartShopping,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Collapse from "./collapse";
import ModalParameter from "./ModalParameter";
import RelatedProduct from "./RelatedProduct";

// import ProductInfo from "./collapse";

function ProductDetails() {

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
  }, []);
  return (
    <>
      <div className="main_detail">
        <div className="detail_info">
          <Carousel />
          <div className="describe">
            <h2 className="describe_title">Tai nghe Edifier W830BT</h2>
            <div className="describe_price">
              <h2 className="describe_price-new">4.350.000₫</h2>
              <span className="describe_price-old">5.220.000₫</span>
            </div>
            <div className="describe_type">
              <span>Phân loại:</span>
              <div className="btn-mau">
                <button>Đen</button>
                <button>Trắng</button>
                <button>Vàng</button>
                <button>Hồng</button>
              </div>
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
            <button className="btn_add_cart">
              {" "}
              <span>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              Thêm vào giỏ hàng
            </button>
            <button className="btn_buy">Mua ngay</button>
          </div>
        </div>
        <div className="content_detail">
          <div className="detail_collapse">
            <Collapse title="Thông tin Sản phẩm" isOpenByDefault={true}>
              <p>
                Tai nghe Marshallchinh phục người dùng bởi sự kết hợp tinh tế
                giữa phong cách cổ điển và hiện đại. Lớp da tổng hợp cao cấp
                cùng logo Marshall tạo nên vẻ ngoài sang trọng, đẳng cấp, khẳng
                định gu thẩm mỹ tinh tế của chủ sở hữu. Thiết kế bịt tai êm ái
                ôm sát vành tai, mang đến cảm giác thoải mái đặc biệt ngay cả
                khi sử dụng trong thời gian dài. Nhờ bản lề gấp gọn thông minh,
                Major V có thể dễ dàng được thu nhỏ, thuận tiện cho việc cất giữ
                và di chuyển. Chiếc tai nghe này không chỉ là phụ kiện âm nhạc
                mà còn là món đồ thời trang độc đáo, thể hiện cá tính riêng của
                bạn.<br/>
                Tai nghe Marshallchinh phục người dùng bởi sự kết hợp tinh tế
                giữa phong cách cổ điển và hiện đại. Lớp da tổng hợp cao cấp
                cùng logo Marshall tạo nên vẻ ngoài sang trọng, đẳng cấp, khẳng
                định gu thẩm mỹ tinh tế của chủ sở hữu. Thiết kế bịt tai êm ái
                ôm sát vành tai, mang đến cảm giác thoải mái đặc biệt ngay cả
                khi sử dụng trong thời gian dài. Nhờ bản lề gấp gọn thông minh,
                Major V có thể dễ dàng được thu nhỏ, thuận tiện cho việc cất giữ
                và di chuyển. Chiếc tai nghe này không chỉ là phụ kiện âm nhạc
                mà còn là món đồ thời trang độc đáo, thể hiện cá tính riêng của
                bạn.<br/>
                Tai nghe Marshallchinh phục người dùng bởi sự kết hợp tinh tế
                giữa phong cách cổ điển và hiện đại. Lớp da tổng hợp cao cấp
                cùng logo Marshall tạo nên vẻ ngoài sang trọng, đẳng cấp, khẳng
                định gu thẩm mỹ tinh tế của chủ sở hữu. Thiết kế bịt tai êm ái
                ôm sát vành tai, mang đến cảm giác thoải mái đặc biệt ngay cả
                khi sử dụng trong thời gian dài. Nhờ bản lề gấp gọn thông minh,
                Major V có thể dễ dàng được thu nhỏ, thuận tiện cho việc cất giữ
                và di chuyển. Chiếc tai nghe này không chỉ là phụ kiện âm nhạc
                mà còn là món đồ thời trang độc đáo, thể hiện cá tính riêng của
                bạn.<br/>
                Tai nghe Marshallchinh phục người dùng bởi sự kết hợp tinh tế
                giữa phong cách cổ điển và hiện đại. Lớp da tổng hợp cao cấp
                cùng logo Marshall tạo nên vẻ ngoài sang trọng, đẳng cấp, khẳng
                định gu thẩm mỹ tinh tế của chủ sở hữu. Thiết kế bịt tai êm ái
                ôm sát vành tai, mang đến cảm giác thoải mái đặc biệt ngay cả
                khi sử dụng trong thời gian dài. Nhờ bản lề gấp gọn thông minh,
                Major V có thể dễ dàng được thu nhỏ, thuận tiện cho việc cất giữ
                và di chuyển. Chiếc tai nghe này không chỉ là phụ kiện âm nhạc
                mà còn là món đồ thời trang độc đáo, thể hiện cá tính riêng của
                bạn.
              </p>
            </Collapse>
            <Collapse title="Đánh giá sản phẩm">
              <p>Nội dung của tiêu đề 2</p>
            </Collapse>
            <Collapse title="Tiêu đề 3">
              <p>Nội dung của tiêu đề 3</p>
            </Collapse>
          </div>
          <div className="detail_parameter">
            <div className="parameter_header">
              <h3>Thông số kỹ thuật</h3> <span>▼</span>
            </div>
            <ModalParameter />
            <RelatedProduct/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
