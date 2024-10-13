import ItemProduct from "../components/ItemProduct/ItemProduct"
import SignupSignin from "../pages/User/Signinsignup"
import HomePage from "../pages/User/Home"
import Voucher from '../components/Voucher/Voucher'
import Event from "../components/Event/Event"
import Item_headphone from "../components/Item_headphones/Item_headphone"
<<<<<<< HEAD
import ProductDetails from "../pages/User/ProductDetails"
=======
import Cart from "../pages/User/Cart/Cart"
>>>>>>> 66d3f5478140518aeb94dd68694361c02afca2d8

const publicRoutes = [
    {path: "/", component: HomePage},
    {path: "/itemProduct", component: ItemProduct},
    {path: '/signin', component: SignupSignin, layout: null},
    {path: '/voucher', component: Voucher},
    {path: '/event', component: Event},
<<<<<<< HEAD
    {path: '/detail', component: ProductDetails},
    {path: '/item_headphone', component: Item_headphone}
=======
    {path: '/item_headphone', component: Item_headphone},
    {path: '/cart', component: Cart}

>>>>>>> 66d3f5478140518aeb94dd68694361c02afca2d8
]



//private dùng khi các router bắt buộc phải đăng nhập
const privateRoutes = [

]

export {publicRoutes, privateRoutes}