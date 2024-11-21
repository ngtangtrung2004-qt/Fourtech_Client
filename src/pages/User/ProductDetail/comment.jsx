import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DetailPrd.css";

function Comment() {
  return (
    <>
      <div className="review-container">
        {/* Header and overall rating */}
        <div className="review-header">
          <h2>Khách hàng nói về sản phẩm</h2>
        </div>
        {/* Comment input */}
        <div className="comment-section">
          <div className="comment-input">
            <input type="text" placeholder="Nhập nội dung bình luận" />
            <div>
              <FontAwesomeIcon icon="fa-regular fa-star" />
              <FontAwesomeIcon icon="fa-regular fa-star" />
              <FontAwesomeIcon icon="fa-regular fa-star" />
              <FontAwesomeIcon icon="fa-regular fa-star" />
              <FontAwesomeIcon icon="fa-regular fa-star" />
            </div>
            <button>Gửi bình luận</button>
          </div>
        </div>

        {/* Comments list */}
        <div className="comment">
            <div className="comment-avata">
                H
            </div>
          <div className="comment-content">
            <div className="comment-text">
              <strong>TRẦN HOÀNG HẢI</strong> <span>- vài giây trước</span>
              <div className="rating-stars">
                <FontAwesomeIcon icon="fa-solid fa-star" />
                <FontAwesomeIcon icon="fa-solid fa-star" />
                <FontAwesomeIcon icon="fa-solid fa-star" />
                <FontAwesomeIcon icon="fa-solid fa-star" />
                <FontAwesomeIcon icon="fa-solid fa-star" />
                <FontAwesomeIcon icon="fa-solid fa-star" />
              </div>
              đẹp
            </div>
            <div className="comment-actions">Trả lời</div>
          </div>
        </div>
        <div className="comment">
             <div className="comment-avata">
                H
            </div>
            <div className="comment-content">

          <div className="comment-text">
            <strong>ngọc</strong> 
            <span>- 4 ngày trước</span>
            <div className="rating-stars">
              <FontAwesomeIcon icon="fa-solid fa-star" />
              <FontAwesomeIcon icon="fa-solid fa-star" />
              <FontAwesomeIcon icon="fa-solid fa-star" />
              <FontAwesomeIcon icon="fa-solid fa-star" />
              <FontAwesomeIcon icon="fa-solid fa-star" />
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </div>
            ib mua hàng
          </div>
          <div className="comment-actions">Trả lời</div>
          <div className="admin-content-response">
            <div className="comment-avata">
                H
            </div>
          <div className="admin-response">
          <span className="admin-name">Nguyễn Hiển (Quản Trị Viên)</span>
          <span className="admin-badge">Quản trị viên</span> 
          <span>- 4 ngày trước</span>
          <p>
            Chào chị Ngọc, Bên em xin phép liên hệ để tư vấn chi tiết hơn. Nếu
            cần thêm thông tin khác chị gọi tổng đài miễn phí 18006601 hoặc có
            thể chat qua Zalo tại đây. Thân mến!
          </p>
        </div>
          </div>
            </div>
        </div>

      </div>
    </>
  );
}

export default Comment;
