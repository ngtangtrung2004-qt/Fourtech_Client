import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DetailPrd.css";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { UserContext } from "../../../components/context/authContext";
import { http } from "../../../utils/http";
import { showToastError, showToastSuccess } from "../../../config/toastConfig";

function Comment({ product_id }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { user } = useContext(UserContext); // Thông tin user
  const [replyToCommentId, setReplyToCommentId] = useState(null); // Bình luận được trả lời
  const [replyContent, setReplyContent] = useState("");
  const [page, setPage] = useState(1); // Trang hiện tại
  const [total, setTotal] = useState(0); // Tổng số bình luận
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5); // Số lượng bình luận mỗi trang

  const handleReplyClick = (commentId) => {
    setReplyToCommentId(commentId); // Hiển thị input dưới commentId được chọn
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await http.get(`/comments/${product_id}`, {
          params: { page, limit }, // Gửi page và limit qua query string
        });
        setTotal(response.data.total);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };

    fetchComments();
  }, [product_id, page, limit]);
  const totalPages = Math.ceil(total / limit); // Tính tổng số trang

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1); // Giảm số trang
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1); // Tăng số trang
  };

  const validateNewComment = () => {
    if (!newComment) {
      showToastError("Không được để trống nội dung!")
      return false
    }
    return true
  }

  const validateReplyContent = () => {
    if (!replyContent) {
      showToastError("Không được để trống nội dung!")
      return false
    }
    return true
  }


  const handleAddComment = async () => {
    if (!user || !user.isAuthenticated) {
      showToastError("Bạn phải đăng nhập để bình luận.");
    } else {
      if (!validateNewComment()) return
      try {
        const token = localStorage.getItem("jwt"); // Lấy token từ localStorage
        const response = await http.post(
          `/comments/${product_id}`,
          { content: newComment, rating: newRating },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
        showToastSuccess("Thêm bình luận thành công");
        const newCommentData = {
          id: response.data.comment.id,
          content: response.data.comment.content,
          rating: response.data.comment.rating,
          product_id: response.data.comment.product_id,
          user_id: response.data.comment.user_id,
          userData: {
            id: response.data.comment.user_id,
            full_name: response.data.comment.userData.full_name,
            role: response.data.comment.userData.role,
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

  // Gửi phản hồi
  const handleReplySubmit = async () => {
    if (!user || !user.isAuthenticated) {
      showToastError("Bạn phải đăng nhập để phản hồi.");
      return;
    }
    if (!validateReplyContent()) return
    try {
      const token = localStorage.getItem("jwt");
      const response = await http.post(
        `/comments/${product_id}`,
        { content: replyContent, parent_comment_id: replyToCommentId }, // Thêm parent_comment_id
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToastSuccess("Thêm phản hồi thành công");

      // Cập nhật danh sách bình luận
      const updatedComments = comments.map((comment) => {
        if (comment.id === replyToCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), response.data.comment],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyContent("");
      setReplyToCommentId(null); // Đóng ô nhập
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
    }
  };
  // console.log('commemt',comments)

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
                    {(() => {
                      const now = Date.now();
                      const updatedAt = new Date(cmt.updatedAt).getTime();
                      const diffInMinutes = Math.floor(
                        (now - updatedAt) / (1000 * 60)
                      );
                      const diffInHours = Math.floor(diffInMinutes / 60);
                      // const diffInDays = Math.floor(diffInHours / 24);

                      if (diffInMinutes < 60) {
                        return `${diffInMinutes} phút trước`;
                      } else if (diffInHours < 24) {
                        return `${diffInHours} giờ trước`;
                      } else {
                        return new Date(cmt.updatedAt).toLocaleDateString(
                          "vi-VN"
                        );
                      }
                    })()}
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
                  <p>{cmt.content}</p>
                </div>
                <div
                  className="comment-actions"
                  onClick={() => handleReplyClick(cmt.id)}
                >
                  Trả lời
                </div>
                <div>
                  {/* Form trả lời */}
                  {replyToCommentId === cmt.id && (
                    <div className="reply-form">
                      <div className="comment-input">
                        <input
                          type="text"
                          placeholder="Nhập phản hồi của bạn..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <button onClick={handleReplySubmit}>
                          Gửi phản hồi
                        </button>
                      </div>
                      <div
                        className="form-close"
                        onClick={() => setReplyToCommentId(null)}
                      >
                        X
                      </div>
                    </div>
                  )}
                  {/* Hiển thị phản hồi */}
                  {cmt.replies &&
                    cmt.replies.map((reply) => (
                      ///
                      <div key={reply.id} className="reply-item">
                        <div className="comment-avata">
                          {reply.userData.full_name[0]}
                        </div>
                        <div className="comment-content">
                          <strong>
                            {reply.userData.role === "admin"
                              ? "Admin"
                              : reply.userData.full_name}
                          </strong>
                          <p>{reply.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
        {/* Phân trang */}
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Trang trước
          </button>
          <span>
            Trang {page} / {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Trang sau
          </button>
        </div>
      </div>
    </>
  );
}

Comment.propTypes = {
  product_id: PropTypes.string.isRequired,
};

export default Comment;
