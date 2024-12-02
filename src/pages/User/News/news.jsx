import { useEffect, useState } from 'react';
import NewTechnology from '../../../components/newTechnology';
import './news.css'

function News ()  {

  const [news,setNews]=useState([])
  useEffect(()=>{
    const fechtNews = async () => {
       if (news.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/news`);
            const data = await res.json();
            setNews(data)
        } catch (error) {
            console.error("Lỗi khi lấy danh sách Tin tức", error);
        }
    };
    fechtNews();
  },[news])
    return (<>
    <div className='news_content'>
      <div className='news_content-title'>
        <h2>Tin tức</h2>
        <p>Cửa hàng FourTech cung cấp nguồn thông tin đáng tin cậy và đa dạng về mọi điều liên quan đến dòng sản phẩm công nghệ. Từ những bài đánh giá chi tiết về các phiên bản mới nhất, thông tin về các tính năng và cập nhật về công nghệ, đến các mẹo sử dụng hữu ích, chuyên mục này là điểm đến lý tưởng cho những người đam mê công nghệ và đặc biệt là người hâm mộ của iPhone.</p>
      </div>
      <hr />
      <div className='news_content-item'>
        <NewTechnology data={news}/>
      </div>
    </div>
</>);
    }

export default News;

