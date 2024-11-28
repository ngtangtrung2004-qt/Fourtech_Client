import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewsDetail() {
    const {id} = useParams()
    const [newsDetail,setNewsDetail]=useState([])
     useEffect(()=>{
    axios.get(
        `${import.meta.env.VITE_API_URL}/api/news/${id}`,
        
      )
      .then((response) => setNewsDetail(response.data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  },[id])

    return ( <>
    <div>
        <h3>{newsDetail.title}</h3>
        <img src={`${import.meta.env.VITE_API_URL}/uploads/${
                      newsDetail.image
                    }`} alt="anh 1"></img>
                    <p className="card-info">{newsDetail.content}</p>
    </div>
    
    </> );
}

export default NewsDetail;