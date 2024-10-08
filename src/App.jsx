import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
///// HEAD
// import HomePage from './pages/User/Home'
// import SignupSignin from './pages/User/Signinsignup'
// import ItemProduct from './components/ItemProduct/ItemProduct'
// import Voucher from './components/Voucher/Voucher'
import { publicRoutes } from './routes/index'
import { DefaultLayout } from './components/Layout'
import { Fragment } from 'react'

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              //Fragment là 1 thẻ chứa nó ko sinh ra thẻ thật trong DOM
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            })}
          </Routes>
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
