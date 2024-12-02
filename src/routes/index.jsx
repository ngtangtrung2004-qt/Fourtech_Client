import SignupSignin from "../pages/User/Signinsignup/Singin";
import HomePage from "../pages/User/Home";
import ProductDetail from "../pages/User/ProductDetail";
import Cart from "../pages/User/Cart/Cart";
import LayoutAdmin from "../components/Layout/LayoutAdmin/";
import DefaultLayout from "../components/Layout/DefaultLayout/";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import ProductAdmin from "../pages/Admin/ProductAdmin";
import OrderList from "../pages/Admin/OderAdmin";
import CategoryAdmin from "../pages/Admin/CategoryAdmin";
import CreateProduct from "../pages/Admin/ProductAdmin/createProduct";
import CreateCategory from "../pages/Admin/CategoryAdmin/createCategory";
import OrderDetail from "../pages/Admin/OderAdmin/orderDetail";
import EditProduct from "../pages/Admin/ProductAdmin/editProduct";
import AllProduct from "../pages/User/allProduct/Allproduct";
import Pay from "../pages/User/pay/pay";
import Brand from "../pages/Admin/brandAdmin";
import Createbrand from "../pages/Admin/BrandAdmin/CreateBrand";
import UserAdmin from "../pages/Admin/UserAdmin";
import Contact from "../pages/User/Contact/Contact";
// import {BrandAdmin} from "../pages/Admin/brandAdmin/index.jsx"
// import BrandAdmin from "../pages/Admin/BrandAdmin"
import InFor from "../pages/User/InFor/InFor";
import ContactAdmin from "../pages/Admin/ContactAdmin";
import ForgotPassword from "../pages/User/Signinsignup/Forgotpassword";
import ResetPassword from "../pages/User/Signinsignup/ResetPassword";
import TrashCanProduct from "../pages/Admin/ProductAdmin/trashCan";
import SearchProducts from "../pages/User/Search";
import Comment from "../pages/Admin/comment/comment";
import Thankyou from "../pages/User/pay/thankyou"
import OrderUser from "../pages/User/OrderUser/orderUser";
import NewsAdmin from "../pages/Admin/NewsAdmin";
import AddNew from "../pages/Admin/NewsAdmin/AddNew";
import EditNews from "../pages/Admin/NewsAdmin/EditNew";
import NewsDetail from "../pages/User/News/newsDetail.";
import News from "../pages/User/News/news";

const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: '/login-register', component: SignupSignin, layout: DefaultLayout },
  { path: '/forgotPassword', component: ForgotPassword, layout: DefaultLayout },
  { path: '/reset-password/:token', component: ResetPassword, layout: DefaultLayout },
  { path: '/cart/:id', component: Cart, layout: DefaultLayout },
  { path: '/allproduct', component: AllProduct, layout: DefaultLayout },
  { path: '/productDetail/:id', component: ProductDetail, layout: DefaultLayout },
  { path: '/pay', component: Pay, layout: DefaultLayout },
  { path: '/contact', component: Contact, layout: DefaultLayout },
  { path: '/info/:id', component: InFor, layout: DefaultLayout },
  { path: '/news', component: News, layout: DefaultLayout },
  { path: '/search', component: SearchProducts, layout: DefaultLayout },
  { path: '/NewsDetail/:id', component: NewsDetail, layout: DefaultLayout },
  
  { path: '/thankyou', component: Thankyou, layout: DefaultLayout },
  { path: '/order-user', component: OrderUser, layout: DefaultLayout },
]


const adminRoutes = [
  { path: "/admin/", component: HomeAdmin, layout: LayoutAdmin },

  { path: "/admin/brand-admin", component: Brand, layout: LayoutAdmin },
  { path: "/admin/add-brand", component: Createbrand, layout: LayoutAdmin },

  { path: "/admin/category-admin", component: CategoryAdmin, layout: LayoutAdmin, },
  { path: "/admin/add-category", component: CreateCategory, layout: LayoutAdmin, },

  { path: "/admin/product-admin", component: ProductAdmin, layout: LayoutAdmin, },
  { path: "/admin/add-product", component: CreateProduct, layout: LayoutAdmin },
  { path: "/admin/edit-product/:id", component: EditProduct, layout: LayoutAdmin, },
  { path: "/admin/trash-can-product", component: TrashCanProduct, layout: LayoutAdmin, },

  { path: '/admin/order-admin', component: OrderList, layout: LayoutAdmin },
  { path: '/admin/orderDetail/:orderIdCode', component: OrderDetail, layout: LayoutAdmin },

  { path: "/admin/contact-admin", component: ContactAdmin, layout: LayoutAdmin, },

  { path: "/admin/user-admin", component: UserAdmin, layout: LayoutAdmin },

  { path: "/admin/comment-admin", component: Comment, layout: LayoutAdmin },
  { path: "/admin/news-admin", component: NewsAdmin, layout: LayoutAdmin },
  { path: "/admin/add-new", component: AddNew, layout: LayoutAdmin },
  { path: "/admin/edit-news/:id", component: EditNews, layout: LayoutAdmin },
];

export { publicRoutes, adminRoutes };
