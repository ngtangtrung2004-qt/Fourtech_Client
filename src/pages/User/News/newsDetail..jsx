import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewsDetail() {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState({}); // Sử dụng object thay vì array
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/news/${id}`)
      .then((response) => setNewsDetail(response.data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, [id]);

  return (
    <div className="news-title" style={{textAlign: 'center', backgroundColor: '#fff', padding: '10px'}}>
      {/* Tiêu đề */}
      <h2 style={{marginBottom: '5px', textAlign: 'left'}}>{newsDetail.title}</h2>

      {/* Hình ảnh */}
      {newsDetail.image && (
        <img
          src={`${API_URL}/uploads/${newsDetail.image}`}
          alt="News"
          style={{ maxWidth: "100%", height: "400px" }}
        />
      )}

      {/* Nội dung */}
      {newsDetail.content && (
        <div
          className="news-content"
          dangerouslySetInnerHTML={{ __html: newsDetail.content }}
          style={{textAlign: 'justify'}}
        />
      )}
    </div>
  );
}

export default NewsDetail;