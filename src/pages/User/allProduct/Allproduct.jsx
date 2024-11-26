import { useContext, useEffect, useState } from 'react'

import Voucher from '../../../components/Voucher/Voucher';
import './allProduct.css';
import { CartContext } from '../../../components/context/CartContext';
import Category from '../../../components/Category/Category';
import ProductService from '../../../services/productService';
import { formatCurrency } from '../../../config/config';

import CartService from '../../../services/cartService';
import { UserContext } from '../../../components/context/authContext';
import { showToastError } from '../../../config/toastConfig';
import { Link } from 'react-router-dom';
import CategoryService from '../../../services/categoryService';


const AllProduct = () => {
  // const [selectedBrands, setSelectedBrands] = useState([]);
  const [pro, setAllProduct] = useState([]);// Lấy tất cả sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc
  const [currentCategory, setCurrentCategory] = useState(""); // Danh mục hiện tại từ URL
  // const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 9; // Số sản phẩm mỗi trang
  const { cart, setCart, updateCart, setTotalQuantity } = useContext(CartContext);
  const { user } = useContext(UserContext)
  const [category, setCategory] = useState([]);// Lấy danh sách danh mục
  const userId = user.account.id



  useEffect(() => {
    fetchAPICategory();
  }, []);
  const fetchAPICategory = async () => {
    const dataCategory = await CategoryService.getAllCategory();
    console.log(dataCategory.data);
    setCategory(dataCategory.data);
  };


  useEffect(() => {
    fetchAPIAllProduct()
  }, [])
  useEffect(() => {
    const middlePosition = window.innerHeight / 2; // Tính vị trí giữa của màn hình
    window.scrollTo({
      top: middlePosition, // Đặt vị trí giữa
      behavior: "smooth",  // Thêm hiệu ứng cuộn mượt mà
    });
  }, [currentPage]);
  const fetchAPIAllProduct = async () => {
    const dataProduct = await ProductService.getAllProduct();
    console.log(dataProduct);
    setAllProduct(dataProduct);
  }

  // Hàm xử lý khi thay đổi checkbox lọc giá
  const handlePriceFilterChange = (event) => {
    const { id, checked } = event.target;
    setSelectedPriceRanges((prevSelectedRanges) =>
      checked ? [...prevSelectedRanges, id] : prevSelectedRanges.filter((range) => range !== id)
    );
  };
  // // Hàm lọc sản phẩm theo giá
  // const filterByPrice = (product) => {
  //   if (!selectedPriceRanges.length) return true;

  //   return selectedPriceRanges.some((range) => {
  //     const price = product.price; // Thay "product.price" nếu bạn lưu giá ở property khác
  //     switch (range) {
  //       case 'Giá dưới 1.000.000₫':
  //         return price < 1000000;
  //       case '1.000.000₫ - 2.000.000₫':
  //         return price >= 1000000 && price <= 2000000;
  //       case '2.000.000₫ - 3.000.000₫':
  //         return price > 2000000 && price <= 3000000;
  //       case '3.000.000₫ - 5.000.000₫':
  //         return price > 3000000 && price <= 5000000;
  //       case '5.000.000₫ - 7.000.000₫':
  //         return price > 5000000 && price <= 7000000;
  //       case '7.000.000₫ - 10.000.000₫':
  //         return price > 7000000 && price <= 10000000;
  //       case 'Giá trên 10.000.000₫':
  //         return price > 10000000;
  //       default:
  //         return false;
  //     }
  //   });
  // };

  // // Hàm xử lý thay đổi của checkbox
  // const handleBrandFilterChange = (event) => {
  //   const { id, checked } = event.target;
  //   setSelectedBrands((prevSelectedBrands) =>
  //     checked ? [...prevSelectedBrands, id] : prevSelectedBrands.filter((brand) => brand !== id)
  //   );
  // };

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
  };


  // // Lọc sản phẩm dựa trên các tiêu chí đã chọn
  // const filteredProducts = pro.filter((product) => {
  //   // Kiểm tra theo thương hiệu
  //   const matchesBrand = selectedBrands.length
  //     ? selectedBrands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))
  //     : true;

  //   // Kiểm tra theo giá
  //   const matchesPrice = filterByPrice(product);

  //   return matchesBrand && matchesPrice; // Chỉ giữ sản phẩm thỏa mãn cả hai điều kiện
  // });

  // Tính toán phân trang dựa trên danh sách sản phẩm đã lọc
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  //Xử lý chuyển trang
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Lấy tham số "category" từ URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category"); // Lấy giá trị "category" từ URL
    setCurrentCategory(categoryFromUrl || ""); // Nếu không có giá trị, đặt là rỗng
  }, [location.search]);
  // Fetch danh sách danh mục
  useEffect(() => {
    const fetchAPICategory = async () => {
      try {
        const dataCategory = await CategoryService.getAllCategory();
        setCategory(dataCategory.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchAPICategory();
  }, []);
  // Fetch danh sách sản phẩm
  useEffect(() => {
    const fetchAPIAllProduct = async () => {
      try {
        const dataProduct = await ProductService.getAllProduct();
        setAllProduct(dataProduct);

        // Nếu có danh mục từ URL, lọc sản phẩm ngay sau khi tải
        if (currentCategory) {
          const filtered = dataProduct.filter((product) =>
            product.category?.name?.toLowerCase() === currentCategory.toLowerCase()
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(dataProduct); // Nếu không có danh mục, hiển thị tất cả sản phẩm
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchAPIAllProduct();
  }, [currentCategory]);
  // Cập nhật danh sách sản phẩm khi danh mục hoặc danh sách thay đổi
  useEffect(() => {
    if (currentCategory) {
      const filtered = pro.filter((product) =>
        product.category?.name?.toLowerCase() === currentCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(pro); // Hiển thị tất cả nếu không có danh mục
    }
  }, [currentCategory, pro]);




  
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

          </div>
        </div>

        <div className="all-product">
          <div className="item-products">
            <ul className="product-all-item">
              {productsToDisplay.map((products) => (
                <li key={products.id} className="item-1">
                  <Link to={`/productDetail/${products.id}`}>
                    {products?.image[0] && (
                      <img
                        className='imgproduct' src={`${import.meta.env.VITE_API_URL}/uploads/${products?.image[0]}`} alt={products.name} />
                    )}

                    <div className="product-description-12">
                      <p>{products.name}</p>
                    </div>
                    {products?.promotion_price === 0 ?
                      (
                        <div className="product-pricing-12">
                          <span className="price-12">{formatCurrency(products.price)}</span>
                        </div>
                      )
                      :
                      (
                        <>
                          <div className="product-pricing-123">{formatCurrency(products.price)}</div>
                          <div className="product-pricing-12">
                            <span className="price-12">{formatCurrency(products.promotion_price)}</span>
                          </div>
                        </>
                      )
                    }
                  </Link>
                  <button className="add-to-cart-btn-12" onClick={() => handleAddToCart(products.id)}>
                    Thêm vào giỏ hàng
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-section">
            <div className="filter-group">
              <h3>Hãng sản xuất</h3>
              {['Samsung', 'Acer', 'Apple', 'Asus', 'Dell', 'Logitech', 'Corsair', 'Sony', 'Razer', 'Keychron'].map((bran, index) => (
                <div key={index} className="filter-item">
                  {/* <input name='xét hãng sản phẩm'
                    type="checkbox"
                    id={bran}
                    onChange={handleBrandFilterChange} /> */}
                  <label htmlFor={bran}>{bran}</label>
                </div>
              ))}
            </div>
            <div >
            </div>

            <hr className="divider" />
            <div className="filter-group">
              <h3>Loại sản phẩm</h3>
              {category.map((category) => (
                <div key={category.id} className="filter-item">
                  {/* <input name='xét soạn phẩm'
                    type="checkbox"
                    // id={tag}
                    onChange={handleBrandFilterChange} /> */}
                  <label htmlFor={category.name}>{category.name}</label>

                </div>
              ))}
            </div>
            <hr className="divider" />
            <div className="filter-group">
              <h3>Giá</h3>
              {['Giá dưới 1.000.000₫', '1.000.000₫ - 2.000.000₫', '2.000.000₫ - 3.000.000₫',
                '3.000.000₫ - 5.000.000₫', '5.000.000₫ - 7.000.000₫', '7.000.000₫ - 10.000.000₫', 'Giá trên 10.000.000₫',].map((tag, index) => (
                  <div key={index} className="filter-item">
                    <input name='xét giá'
                      type="checkbox"
                      id={tag}
                      onChange={handlePriceFilterChange} />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
        <Category></Category>
      </div>
    </>
  )
}

export default AllProduct;

