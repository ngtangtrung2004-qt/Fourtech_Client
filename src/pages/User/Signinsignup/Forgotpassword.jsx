import { FaArrowLeftLong } from "react-icons/fa6";
import "./signUpSignIn.css"
import { Link } from "react-router-dom";

function forgotPassword(){
    return(

        <>
            <div className="main_dlmk">
                <div className="top_dlmk">
                    <Link to='/signin'>
                    <FaArrowLeftLong/>
                    </Link>
                    <p className="name_dlmk">Đặt lại mật khẩu</p>
                </div>
                <div className="center_dlmk">
                    <input type="email" placeholder="Email"/>
                </div>
                <Link to='/code'>
                <div className="bot_dlmk">
                    <button>Tiếp Theo</button>
                </div>
                </Link>
            </div>

        </>
    )
}
export default forgotPassword