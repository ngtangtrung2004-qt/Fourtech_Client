import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { adminRoutes, publicRoutes } from './routes/index'
import { Fragment } from 'react'
import { CartProvider } from './components/CartContext/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
            </Routes>
          </CartProvider>
          <ToastContainer />
        </div>
      </Router>
    </>
  )
}

export default App
