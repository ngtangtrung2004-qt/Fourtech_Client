import ItemProduct from "../components/ItemProduct/ItemProduct"
import SignupSignin from "../pages/User/Signinsignup/Singin"
import HomePage from "../pages/User/Home"
import Voucher from '../components/Voucher/Voucher'
import Event from "../components/Event/Event"
import ProductDetails from "../pages/User/ProductDetails"
import Cart from "../pages/User/Cart/Cart"
import AllProduct from "../pages/User/allProduct/Allproduct"
import Pay from "../pages/User/pay/pay"

const publicRoutes = [
    {path: "/", component: HomePage},
    {path: "/itemProduct", component: ItemProduct},
    {path: '/signin', component: SignupSignin, layout: null},
    {path: '/voucher', component: Voucher},
    {path: '/event', component: Event},
    {path: '/detail', component: ProductDetails},
    {path: '/cart', component: Cart},
    {path: '/AllProduct',component:AllProduct},
    {path: '/pay', component: Pay}
]



//private dùng khi các router bắt buộc phải đăng nhập
const privateRoutes = [

]

export {publicRoutes, privateRoutes}