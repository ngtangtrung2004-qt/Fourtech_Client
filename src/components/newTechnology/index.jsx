import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import './NewTechelogy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
function NewTechnology() {
  return (<>
    <div className="item-new grid" >
      <div className="cart-new">
        <img src="../../../src/assets/images/../../../src/assets/images/bgr-new.jpg" alt="anh 1"></img>
        <div className="card-information">
          <h4 className="card-title">Google trình làng Google Gemini 1.0: Mô hình ngôn ngữ thông minh hàng đầu, tham vọng vượt mặt GPT-4 Nguyễn Công Minh</h4>
          <p className="card-info">Đây là mô hình ngôn ngữ lớn tốt nhất mà Google đã tạo ra, và sẽ có ba cấp độ khác nhau với sức mạnh...</p>
          <div className="card-action">
            <div className="card-date">
              <span><FontAwesomeIcon icon={faCalendarDay} /></span>
              <span>13/12/2002</span>
            </div>
            <Link to={'/newArticle'} ><button className="card-btn"> Xem chi tiết</button></Link>
          </div>
        </div>
      </div>
      <div className="cart-new">
        <img src="../../../src/assets/images/bgr-new.jpg" alt="anh 1"></img>
        <div className="card-information">
          <h4 className="card-title">Google trình làng Google Gemini 1.0: Mô hình ngôn ngữ thông minh hàng đầu, tham vọng vượt mặt GPT-4 Nguyễn Công Minh</h4>
          <p className="card-info">Đây là mô hình ngôn ngữ lớn tốt nhất mà Google đã tạo ra, và sẽ có ba cấp độ khác nhau với sức mạnh...</p>
          <div className="card-action">
            <div className="card-date">
              <span><FontAwesomeIcon icon={faCalendarDay} /></span>
              <span>13/12/2002</span>
            </div>
            <Link to={'/newArticle'} ><button className="card-btn"> Xem chi tiết</button></Link>
          </div>
        </div>
      </div>
      <div className="cart-new">
        <img src="../../../src/assets/images/bgr-new.jpg" alt="anh 1"></img>
        <div className="card-information">
          <h4 className="card-title">Google trình làng Google Gemini 1.0: Mô hình ngôn ngữ thông minh hàng đầu, tham vọng vượt mặt GPT-4 Nguyễn Công Minh</h4>
          <p className="card-info">Đây là mô hình ngôn ngữ lớn tốt nhất mà Google đã tạo ra, và sẽ có ba cấp độ khác nhau với sức mạnh...</p>
          <div className="card-action">
            <div className="card-date">
              <span><FontAwesomeIcon icon={faCalendarDay} /></span>
              <span>13/12/2002</span>
            </div>
            <Link to={'/newArticle'} ><button className="card-btn"> Xem chi tiết</button></Link>
          </div>
        </div>
      </div>
      <div className="cart-new">
        <img src="../../../src/assets/images/bgr-new.jpg" alt="anh 1"></img>
        <div className="card-information">
          <h4 className="card-title">Google trình làng Google Gemini 1.0: Mô hình ngôn ngữ thông minh hàng đầu, tham vọng vượt mặt GPT-4 Nguyễn Công Minh</h4>
          <p className="card-info">Đây là mô hình ngôn ngữ lớn tốt nhất mà Google đã tạo ra, và sẽ có ba cấp độ khác nhau với sức mạnh...</p>
          <div className="card-action">
            <div className="card-date">
              <span><FontAwesomeIcon icon={faCalendarDay} /></span>
              <span>13/12/2002</span>
            </div>
            <Link to={'/newArticle'} ><button className="card-btn"> Xem chi tiết</button></Link>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default NewTechnology;