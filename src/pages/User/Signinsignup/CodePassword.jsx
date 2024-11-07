import { FaArrowLeftLong } from "react-icons/fa6";
import "./signUpSignIn.css"
import { Link } from "react-router-dom";

const CodePassword = () => {
  return (
    <>
      <div className="main_code">
                <div className="top_code">
                    <Link to='/forgotPassword'>
                    <FaArrowLeftLong/>
                    </Link>
                    <p className="name_code">Nhập mã code</p>
                </div>
                <div className="center_code">
                    <input type="number" placeholder="Code"/>
                </div>
                <Link to=''>
                <div className="bot_code">
                    <button>Tiếp Theo</button>
                </div>
                </Link>
            </div>
    </>
  )
}

export default CodePassword
