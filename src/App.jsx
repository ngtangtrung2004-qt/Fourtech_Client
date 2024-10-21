import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
///// HEAD
// import HomePage from './pages/User/Home'
// import SignupSignin from './pages/User/Signinsignup'
// import ItemProduct from './components/ItemProduct/ItemProduct'
// import Voucher from './components/Voucher/Voucher'
import { adminRoutes, publicRoutes } from './routes/index'
// import { DefaultLayout } from './components/Layout'
import { Fragment } from 'react'
import { CartProvider } from './components/CartContext/CartContext'
import Cart from './pages/User/Cart/Cart';
import ItemProduct from './components/ItemProduct/ItemProduct'


function App() {
  return (
    <>
      <Router>
        <div className="App">
        <CartProvider>
          <Routes>
             {/* Định tuyến cho Client */}
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || Fragment;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* Định tuyến cho Admin */}
          {adminRoutes.map((route, index) => {
            const Layout = route.layout || Fragment;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
            <Route path="/" element={<ItemProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
        </div>
        {/* <Route path={'/'} element={<HomePage />} />
          <Route path={'/Signin'} element={<SignupSignin />} />
          <Route path='/itemProduct' element={<ItemProduct />} />
          <Route path='/voucher' element={<Voucher />} /> */}
          
      </Router>
    </>
  )
}

export default App
