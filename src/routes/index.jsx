import ItemProduct from "../components/ItemProduct/ItemProduct"
import SignupSignin from "../pages/User/Signinsignup/Singin"
import HomePage from "../pages/User/Home"
import Voucher from '../components/Voucher/Voucher'
import Event from "../components/Event/Event"
import ProductDetails from "../pages/User/ProductDetails"
import Cart from "../pages/User/Cart/Cart"
import OurProduct from "../pages/User/ourProduct/Ourproduct"
import LayoutAdmin from "../components/Layout/LayoutAdmin/"
import DefaultLayout from "../components/Layout/DefaultLayout/"

import HomeAdmin from "../pages/Admin/HomeAdmin"
import ProductAdmin from "../pages/Admin/ProductAdmin"
import OrderList from "../pages/Admin/OderAdmin"
import CategoryAdmin from "../pages/Admin/CategoryAdmin"
import UserAdmin from "../pages/Admin"
import CreateProduct from "../pages/Admin/ProductAdmin/createProduct"
import CreateCategory from "../pages/Admin/CategoryAdmin/createCategory"
import OrderDetail from "../pages/Admin/OderAdmin/orderDetail"
import EditProduct from "../pages/Admin/ProductAdmin/editProduct"
// import OrderDetail from "../pages/Admin/OderAdmin/orderDetail"
// import { GrOrderedList } from "react-icons/gr"

const publicRoutes = [
    {path: "/", component: HomePage, layout: DefaultLayout},
    {path: "/itemProduct", component: ItemProduct},
    {path: '/signin', component: SignupSignin, layout: null},
    {path: '/voucher', component: Voucher},
    {path: '/event', component: Event},
    {path: '/detail', component: ProductDetails,layout: DefaultLayout},
    {path: '/cart', component: Cart,layout: DefaultLayout},
    {path: '/ourProduct',component:OurProduct,},

]

const adminRoutes = [
  { path: '/admin/', component: HomeAdmin, layout:  LayoutAdmin},
  { path: '/admin/product-admin', component: ProductAdmin, layout:  LayoutAdmin},
  { path: '/admin/order-admin', component: OrderList, layout:  LayoutAdmin},
  { path: '/admin/orderDetail', component: OrderDetail, layout:  LayoutAdmin},
  { path: '/admin/category-admin', component: CategoryAdmin, layout:  LayoutAdmin},
  { path: '/admin/user-admin', component: UserAdmin, layout:  LayoutAdmin},
  { path: '/admin/add-product', component: CreateProduct, layout:  LayoutAdmin},
  { path: '/admin/editProduct', component: EditProduct, layout:  LayoutAdmin},
  { path: '/admin/add-category', component: CreateCategory, layout:  LayoutAdmin},
];



//private dùng khi các router bắt buộc phải đăng nhập
const privateRoutes = [

]

export {publicRoutes, privateRoutes,adminRoutes}