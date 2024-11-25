import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DetailPrd.css";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { UserContext } from "../../../components/context/authContext";
import { http } from "../../../utils/http";

function Comment({ product_id }) {
  console.log("idprodcmment", product_id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { user } = useContext(UserContext);
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const handleReplyClick = (commentId) => {
    setReplyToCommentId(commentId); // Hiển thị input dưới commentId được chọn
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await http.get(`/comments/${product_id}`);
        // console.log("API Response:", response);
        setComments(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };

    fetchComments();
  }, [product_id]);
  // const token = localStorage.getItem("userInfo");
  // console.log("Token in localStorage:", token);
  const handleAddComment = async () => {
    if (!user || !user.isAuthenticated) {
      alert("Bạn phải đăng nhập để bình luận.");
    } else {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await http.post(
          `/comments/${product_id}`,
          { content: newComment, rating: newRating },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
         alert("Thêm bình luận thành công");
        const newCommentData = {
          id: response.data.comment.id,
          content: response.data.comment.content,
          rating: response.data.comment.rating,
          product_id: response.data.comment.product_id,
          user_id: response.data.comment.user_id,
          userData: {
            id: response.data.comment.user_id,
            full_name: response.data.comment.userData.full_name,
          },
          updatedAt: response.data.comment.updatedAt,
        };
        // Thêm bình luận vào danh sách
        setComments([...comments, newCommentData]);
        setNewComment(""); // Reset bình luận mới
        setNewRating(0); // Reset rating
      } catch (error) {
        console.error("Lỗi khi gửi bình luận:", error);
      }
    }
  };

  return (
    <>
      <div className="review-container">
        {/* Tiêu đề và đánh giá tổng quan */}
        <div className="review-header">
          <h2>Khách hàng nói về sản phẩm</h2>
        </div>
        {/* Nhập bình luận */}
        <div className="comment-section">
          <div className="comment-input">
            <input
              type="text"
              value={newComment}
              placeholder="Nhập nội dung bình luận"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={
                    star <= newRating
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                  className="star-icon"
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
            <button onClick={handleAddComment}>Gửi bình luận</button>
          </div>
        </div>

        {/* Danh sách bình luận */}
        {comments.map((cmt) => {
          return (
            <div className="comment" key={cmt.id}>
              <div className="comment-avata">{cmt.userData.full_name[0]}</div>
              <div className="comment-content">
                <div className="comment-text">
                  <strong>{cmt.userData.full_name}</strong>{" "}
                  <span>
                    -{" "}
                    {Math.floor(
                      (Date.now() - new Date(cmt.updatedAt).getTime()) /
                        (1000 * 60)
                    )}{" "}
                    phút trước
                  </span>
                  <div className="rating-stars">
                    {[...Array(cmt.rating)].map((_, index) => (
                      <FontAwesomeIcon
                        icon="fa-solid fa-star"
                        key={index}
                        className="star-active"
                      />
                    ))}
                  </div>
                  {cmt.content}
                </div>
                <div className="comment-actions" onClick={() => handleReplyClick(cmt.id)}>Trả lời</div>
                <div>

               {replyToCommentId === cmt.id && (
            <div className="reply-form">
              <input
                type="text"
                placeholder="Nhập phản hồi của bạn..."
                
                // onChange={(e) => setReplyContent(e.target.value)}
              />
              <button>Gửi phản hồi</button>
            </div>
          )}
              </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

Comment.propTypes = {
  product_id: PropTypes.string.isRequired,
};

export default Comment;
