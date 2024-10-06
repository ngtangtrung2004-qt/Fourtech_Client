
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import SignupSignin from './pages/Signinsignup'
import ItemProduct from './pages/itemProduct/itemProduct'
import Voucher from './pages/Voucher/Voucher'



function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/Signin'} element={<SignupSignin/>} />
        <Route path='/itemProduct' element={<ItemProduct/>}/>
        <Route path='/voucher' element={<Voucher/>}/>
      </Routes>
    </>
  )
}

export default App
