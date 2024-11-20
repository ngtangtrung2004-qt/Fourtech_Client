import { Routes, Route } from 'react-router-dom'
import './App.css'
import { adminRoutes, publicRoutes } from './routes/index'
import { Fragment, useContext, useEffect } from 'react'
import { CartProvider } from './components/context/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoute from './routes/adminRoute'
import { UserContext } from './components/context/authContext'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import NotFound from './pages/404NotFound'

function App() {
  const { user } = useContext(UserContext)
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
  })

  if (user && user.isLoading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
  }

  return (
    <div className="App">
      <CartProvider>
        <Routes>
          {/* Định tuyến cho Client */}
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || Fragment
            const Page = route.component
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
            )
          })}

          {/* Định tuyến cho Admin */}
          {adminRoutes.map((route, index) => {
            const Layout = route.layout || Fragment
            const Page = route.component
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AdminRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </AdminRoute>
                }
              />
            )
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
      <ToastContainer />
    </div>
  )
}

export default App
