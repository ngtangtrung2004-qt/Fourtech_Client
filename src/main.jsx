
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvder } from './components/context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvder>
      <App />
    </UserProvder>
  </BrowserRouter>
  // </React.StrictMode>,
)
