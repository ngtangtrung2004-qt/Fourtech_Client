import ItemProduct from "../components/ItemProduct/ItemProduct"
import SignupSignin from "../pages/User/Signinsignup"
import HomePage from "../pages/User/Home"
import Voucher from '../components/Voucher/Voucher'
import Event from "../components/Event/Event"
import Item_headphone from "../components/Item_headphones/Item_headphone"
import Cart from "../pages/User/Cart/Cart"

const publicRoutes = [
    {path: "/", component: HomePage},
    {path: "/itemProduct", component: ItemProduct},
    {path: '/signin', component: SignupSignin, layout: null},
    {path: '/voucher', component: Voucher},
    {path: '/event', component: Event},
    {path: '/item_headphone', component: Item_headphone},
    {path: '/cart', component: Cart}

]



//private dùng khi các router bắt buộc phải đăng nhập
const privateRoutes = [

]

export {publicRoutes, privateRoutes}