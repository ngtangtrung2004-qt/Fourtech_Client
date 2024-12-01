import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './search.css'
import { UserContext } from '../../../components/context/authContext';
import { CartContext } from '../../../components/context/CartContext';
import { showToastError } from '../../../config/toastConfig';
import CartService from '../../../services/cartService';
import { formatCurrency } from '../../../config/config';


function SearchProducts() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const [results, setResults] = useState([]);
  const { user } = useContext(UserContext);
  const { cart, setCart, updateCart, setTotalQuantity } = useContext(CartContext);
  const userId = user.account.id;

  const handleAddToCart = async (idProduct) => {
    if (user.isAuthenticated === false) {
      showToastError("Vui lòng đăng nhập");
    } else {
      try {
        //Xác định số lượng sản phẩm cần thêm vào giỏ hàng là 1
        const quantity = 1;

        // Lấy thông tin giỏ hàng từ context
        const cartItems = cart;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa.
        //Tìm kiếm trong (mảng cartItems) xem có sản phẩm nào có product_id trùng với idProduct (ID của sản phẩm cần thêm vào giỏ hàng) không.
        //Nếu tìm thấy sản phẩm (existingCartItem), thì nó sẽ trả về sản phẩm đó, nếu không sẽ trả về undefined.
        const existingCartItem = cartItems.find(
          (item) => item.product_id === idProduct
        );

        if (existingCartItem) {
          // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
          //Nếu sản phẩm đã có trong giỏ hàng (existingCartItem), số lượng của sản phẩm này được tăng thêm
          existingCartItem.quantity += quantity; // Tăng số lượng
        } else {
          // Thêm sản phẩm mới vào giỏ hàng
          //Nếu sản phẩm chưa có trong giỏ hàng (else), một đối tượng sản phẩm mới được thêm vào giỏ hàng với product_id là idProduct và số lượng là quantity.
          cartItems.push({
            product_id: idProduct,
            quantity: quantity,
          });
        }

        // Cập nhật lại giỏ hàng trong context
        //Sau khi cập nhật hoặc thêm sản phẩm mới, hàm gọi setCart(cartItems) để cập nhật lại giỏ hàng trong context.
        //Điều này sẽ làm cho các component khác sử dụng CartContext nhận được giỏ hàng mới
        setCart(cartItems);

        // Cập nhật lại tổng số lượng trong giỏ hàng
        const newTotalQuantity = cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        //Tính tổng số lượng sản phẩm trong giỏ hàng. Hàm reduce sẽ cộng dồn giá trị của thuộc tính quantity của mỗi sản phẩm trong giỏ hàng.

        // Cập nhật tổng số lượng sản phẩm trong giỏ hàng bằng newTotalQuantity
        setTotalQuantity(newTotalQuantity);

        // Gửi dữ liệu giỏ hàng lên server
        const dataCart = await CartService.postCart({
          user_id: userId,
          product_id: idProduct,
          quantity: quantity,
        });

        if (dataCart && dataCart.EC === 0) {
          // Cập nhật lại cart và thông báo thành công
          updateCart(cartItems);
        } else {
          console.error(
            dataCart.message || "Không thể thêm sản phẩm vào giỏ hàng"
          );
        }
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
      }
    }
  };

  useEffect(() => {
    if (query) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/search?query=${query}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error('Lỗi khi tìm kiếm:', error);
        });
    }
  }, [query]);

  //Tính % giá giảm
  function calculateDiscount(originalPrice, discountedPrice) {
    const discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercent); // Làm tròn kết quả
  }


  return (<>
    <div>
      <h2 style={{ marginBottom: '10px' }}>Kết quả tìm kiếm cho: {query}</h2>
      {results?.length > 0 ?
        (
          <div className="products_1">
            {results?.map((prd) => (
              <ul className="productItem_1" key={prd.id}>
                <li className="item_1">
                  <Link to={`/productDetail/${prd.id}`}>
                    <a href="">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${prd.image[0]}`}
                        alt="san pham"
                      />
                    </a>
                    <div className="product_name">
                      <p title={prd.name}>{prd.name}</p>
                    </div>
                    {prd?.promotion_price > 0 ?
                      (
                        <>
                          <div className="productPricing_1">
                            <span className="price_1">
                              {formatCurrency(prd.price)}
                            </span>
                            <span className="tag_1">
                              {`-${calculateDiscount(prd.price, prd.promotion_price)}%`}
                            </span>
                          </div>
                          <div className="productPricing-12">
                            {formatCurrency(prd.promotion_price)}
                          </div>
                        </>
                      )
                      :
                      (
                        <>
                          <div className="productPricing-12" style={{marginTop: '20px'}}>
                            {formatCurrency(prd.price)}
                          </div>
                        </>
                      )
                    }

                  </Link>
                  <button
                    className="add-to-cart-btn_1"
                    onClick={() => handleAddToCart(prd.id)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <p>Không tìm thấy kết quả nào</p>
        )}
    </div>
  </>);
}

export default SearchProducts;