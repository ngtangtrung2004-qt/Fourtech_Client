
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import SignupSignin from './pages/Signinsignup/Singin'

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/Signin'} element={<SignupSignin/>} />
      </Routes>
    </>
  )
}

export default App
