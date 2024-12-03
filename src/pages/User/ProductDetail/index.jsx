import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "./Caroucel";

import "./DetailPrd.css";
import {
  faCartShopping,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Collapse from "./collapse"
import RelatedProduct from "./RelatedProduct";
import { useParams } from "react-router-dom";
import Comment from "./comment";
import { useContext, useEffect, useState } from "react";
import axios from "axios"; import { formatCurrency, formatDate } from "../../../config/config";
import ProductService from '../../../services/productService';
import { UserContext } from "../../../components/context/authContext";
import { CartContext } from "../../../components/context/CartContext";
import CartService from "../../../services/cartService";
import { showToastError } from "../../../config/toastConfig";



// import ProductInfo from "./collapse";

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([])
  const [allProduct, setAllProduct] = useState([]);
  const { user } = useContext(UserContext)
  const { cart, setCart, updateCart, setTotalQuantity } = useContext(CartContext);
  const userId = user.account.id

  useEffect(() => {
    axios.get(
      `${import.meta.env.VITE_API_URL}/api/product/${id}`,

    )
      .then((response) => setProductDetail(response.data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, [id])

  useEffect(() => {
    const fetchAPIAllProduct = async () => {
      const dataProduct = await ProductService.getAllProduct();
      // console.log(dataProduct);
      setAllProduct(dataProduct);
    }
    fetchAPIAllProduct()
    APIProductIncreaseView()
  }, [])


  const APIProductIncreaseView = async () => {
    const data = await ProductService.postProductIncreaseView(id)
    return data.data
  }


  function calculateDiscount(originalPrice, discountedPrice) {
    const discountPercent = ((originalPrice - discountedPrice) / originalPrice * 100);
    console.log(discountPercent);
    return Math.round(discountPercent); // Làm tròn kết quả
  }

  const handleAddToCart = async (idProduct) => {
    if (user.isAuthenticated === false) {
      showToastError("Vui lòng đăng nhập")
    } else {
      try {
        //Xác định số lượng sản phẩm cần thêm vào giỏ hàng là 1
        const quantity = 1;

        // Lấy thông tin giỏ hàng từ context
        const cartItems = cart;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa. 
        //Tìm kiếm trong (mảng cartItems) xem có sản phẩm nào có product_id trùng với idProduct (ID của sản phẩm cần thêm vào giỏ hàng) không.
        //Nếu tìm thấy sản phẩm (existingCartItem), thì nó sẽ trả về sản phẩm đó, nếu không sẽ trả về undefined.
        const existingCartItem = cartItems.find(item => item.product_id === idProduct);

        if (existingCartItem) {
          // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
          //Nếu sản phẩm đã có trong giỏ hàng (existingCartItem), số lượng của sản phẩm này được tăng thêm
          existingCartItem.quantity += quantity;  // Tăng số lượng
        } else {
          // Thêm sản phẩm mới vào giỏ hàng
          //Nếu sản phẩm chưa có trong giỏ hàng (else), một đối tượng sản phẩm mới được thêm vào giỏ hàng với product_id là idProduct và số lượng là quantity.
          cartItems.push({
            product_id: idProduct,
            quantity: quantity
          });
        }

        // Cập nhật lại giỏ hàng trong context
        //Sau khi cập nhật hoặc thêm sản phẩm mới, hàm gọi setCart(cartItems) để cập nhật lại giỏ hàng trong context. 
        //Điều này sẽ làm cho các component khác sử dụng CartContext nhận được giỏ hàng mới
        setCart(cartItems);

        // Cập nhật lại tổng số lượng trong giỏ hàng
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        //Tính tổng số lượng sản phẩm trong giỏ hàng. Hàm reduce sẽ cộng dồn giá trị của thuộc tính quantity của mỗi sản phẩm trong giỏ hàng.

        // Cập nhật tổng số lượng sản phẩm trong giỏ hàng bằng newTotalQuantity
        setTotalQuantity(newTotalQuantity);

        // Gửi dữ liệu giỏ hàng lên server
        const dataCart = await CartService.postCart({
          user_id: userId,
          product_id: idProduct,
          quantity: quantity
        });

        if (dataCart && dataCart.EC === 0) {
          // Cập nhật lại cart và thông báo thành công
          updateCart(cartItems);
        } else {
          console.error(dataCart.message || 'Không thể thêm sản phẩm vào giỏ hàng');
        }
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.message);
      }
    }
  }

  return (
    <>
      <div className="main_detail">
        <div className="detail_info">
          <Carousel imageDetailPrd={productDetail.image || []} />
          <div className="describe">
            <h2 className="describe_title">{productDetail.name}</h2>
            {productDetail?.promotion_price > 0 ?
              <>
                <div className="describe_price">
                  <h2 className="describe_price-new">{formatCurrency(productDetail.promotion_price)}</h2>
                  <span className="describe_price-old"> {formatCurrency(productDetail.price)}</span>
                  <span className="tag_1">
                    {`-${calculateDiscount(productDetail.price, productDetail.promotion_price)}%`}
                  </span>
                </div>
              </>
              :
              <>
                <div className="describe_price">
                  <h2 className="describe_price-new"> {formatCurrency(productDetail.price)}</h2>
                </div>
              </>
            }

            <div className="describe_promotion">
              <p style={{ fontWeight: 'bold' }}>Khuyến mãi nổi bật</p>
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Giảm ngay 100.000₫ áp dụng đến ngày {formatDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000))}
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
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Giảm 1.000.000đ qua QR bank
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Trả góp 0% đến 12 tháng, 0đ trả trước qua Samsung Finance+
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Trợ giá tối đa đến 2.000.000đ khi thu cũ đổi mới
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Quyền lợi bảo hành Vip 12 tháng 1 đổi 1 tại FourTech
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="check_icon"
                  />
                  Giảm thêm 500K khi thanh toán qua Techcombank, VIB, VPBank
                </li>
              </ul>
            </div>

            <button className="btn_add_cart" onClick={() => handleAddToCart(productDetail.id)}>
              <span>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="content_detail">
          <div className="detail_collapse">
            <Collapse title="Thông tin Sản phẩm" isOpenByDefault={true}>
            <div dangerouslySetInnerHTML={{ __html: productDetail.description }}/>
            </Collapse>
            <Comment product_id={id} />
          </div>
          <div className="detail_parameter">

            <RelatedProduct allProducts={allProduct || []} />
          </div>
        </div>
      </div >
    </>
  );
}

export default ProductDetail;
