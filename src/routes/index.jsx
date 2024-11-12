import SignupSignin from "../pages/User/Signinsignup/Singin"
import HomePage from "../pages/User/Home"
import ProductDetails from "../pages/User/ProductDetails"
import Cart from "../pages/User/Cart/Cart"
import LayoutAdmin from "../components/Layout/LayoutAdmin/"
import DefaultLayout from "../components/Layout/DefaultLayout/"
import HomeAdmin from "../pages/Admin/HomeAdmin"
import ProductAdmin from "../pages/Admin/ProductAdmin"
import OrderList from "../pages/Admin/OderAdmin"
import CategoryAdmin from "../pages/Admin/CategoryAdmin"
// import UserAdmin from "../pages/Admin/UserAdmin"
import CreateProduct from "../pages/Admin/ProductAdmin/createProduct"
import CreateCategory from "../pages/Admin/CategoryAdmin/createCategory"
import OrderDetail from "../pages/Admin/OderAdmin/orderDetail"
import EditProduct from "../pages/Admin/ProductAdmin/editProduct"
// import { GrOrderedList } from "react-icons/gr"
import AllProduct from "../pages/User/allProduct/Allproduct"
import Pay from "../pages/User/pay/pay"
import Brand from "../pages/Admin/brandAdmin"
import Createbrand from "../pages/Admin/BrandAdmin/CreateBrand"
import UserAdmin from "../pages/Admin/UserAdmin"
import Contact from "../pages/User/Contact/Contact"
import Article from "../pages/User/Article/article"
// import {BrandAdmin} from "../pages/Admin/brandAdmin/index.jsx"
// import BrandAdmin from "../pages/Admin/BrandAdmin"
import InFor from "../pages/User/InFor/InFor"
import Item_Mouse from "../components/Item_Mouse/Item_Mouse"

const publicRoutes = [
    {path: "/", component: HomePage, layout: DefaultLayout},
    {path: '/login-register', component: SignupSignin, layout: DefaultLayout},
    {path: '/detail', component: ProductDetails,layout: DefaultLayout},
    {path: '/cart', component: Cart,layout: DefaultLayout},
    {path: '/allProduct',component:AllProduct,layout: DefaultLayout},
    {path: '/pay', component: Pay,layout: DefaultLayout},
    {path:'/contact',component:Contact,layout: DefaultLayout},
    {path: '/mouse', component: Item_Mouse,layout: DefaultLayout},
    {path: '/info', component: InFor,layout: DefaultLayout},
    {path: '/article', component: Article,layout: DefaultLayout},


]

const adminRoutes = [
  { path: '/admin/', component: HomeAdmin, layout:  LayoutAdmin},
  { path: '/admin/product-admin', component: ProductAdmin, layout:  LayoutAdmin},
  { path: '/admin/order-admin', component: OrderList, layout:  LayoutAdmin},
  { path: '/admin/orderDetail', component: OrderDetail, layout:  LayoutAdmin},
  { path: '/admin/category-admin', component: CategoryAdmin, layout:  LayoutAdmin},
  { path: '/admin/user-admin', component: UserAdmin, layout:  LayoutAdmin},
  { path: '/admin/brand-admin', component: Brand, layout:  LayoutAdmin},
  { path: '/admin/add-brand', component: Createbrand, layout:  LayoutAdmin},
  // { path: '/admin/brandadmin', component: BrandAdmin, layout:  LayoutAdmin},
  { path: '/admin/add-product', component: CreateProduct, layout:  LayoutAdmin},
  { path: '/admin/editProduct', component: EditProduct, layout:  LayoutAdmin},
  { path: '/admin/add-category', component: CreateCategory, layout:  LayoutAdmin},
];

export {publicRoutes, adminRoutes}