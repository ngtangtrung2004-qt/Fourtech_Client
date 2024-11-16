import './newArticle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import NewTechnology from '../../../components/newTechnology';
import HeaderProduct from '../Home/headerProduct';

function newArticle ()  {
    return (
        <>
        <div className="newArticle">
            <div className="newArticle__title">Google trình làng Google Gemini 1.0: Mô hình ngôn ngữ thông minh hàng đầu, tham vọng vượt mặt GPT-4 Nguyễn Công Minh</div>
            <div className="date-card">
        <span><FontAwesomeIcon icon={faCalendarDay} /></span>
        <span>13/12/2002</span>
        </div>
            <div className="newArticle__content">Đây là mô hình ngôn ngữ lớn tốt nhất mà Google đã tạo ra, và sẽ có ba cấp độ khác nhau với sức mạnh tăng dần. Ngày hôm qua (07/12), Google đã chính thức trình làng Gemini phiên bản 1.0 - thứ được công ty đánh giá là sẽ “vượt mặt ChatGPT”. Đây là mô hình ngôn ngữ lớn tốt nhất mà Google đã tạo ra, và sẽ có ba cấp độ khác nhau là Nano, Pro và Ultra với sức mạnh tăng dần. Trong khi Gemini 1.0 Nano sẽ được tích hợp vào mẫu smartphone Google Pixel 8 Pro để giải quyết các công việc cơ bản thì với AI Google Bard, nó sẽ có được Gemini 1.0 Pro để xử lý các tác vụ đặc biệt khó.
                 So với mô hình ngôn ngữ đang có trên Google Bard, Google Gemini 1.0 sẽ có thể lập luận tốt hơn với những câu trả lời của mình. Lý do là vì đây là ngôn ngữ này có khả năng thông hiểu và phân tích vấn đề của người dùng dựa trên nguồn thông tin kết hợp giữa hình ảnh, âm thanh và văn bản.
                Với những hình thức đào tạo khác biệt so với các ngôn ngữ khác trên thị trường, Google hướng tới việc Gemini sẽ có khả năng suy luận và xử lý phức tạp hơn so với GPT-4 đang phổ biến. Công ty đã thử nghiệm để Gemini xử lý lên tới 200.000 tài liệu nghiên cứu khoa học, chắt lọc dựa trên chủ đề định sẵn và tổng hợp thông tin trong khoảng 1h đồng hồ.
                Với việc coding, ngôn ngữ này có thể hiểu, giải thích và viết ra các đoạn code chất lượng cao bằng Python, Java, C++ và Go. Và khi dược thử nghiệm sâu hơn, Gemini cũng thể hiện cực kỳ ấn tượng với việc “vượt xa các kết quả hiện đại nhất trên 30 trong số 32 điểm chuẩn học thuật được sử dụng rộng rãi trong nghiên cứu và phát triển mô hình ngôn ngữ lớn.”
                Với việc đã được tích hợp vào Google Bard, Gemini 1.0 bản Pro đã có thể được trải nghiệm ngay, tuy nhiên ngôn ngữ hỗ trợ mới chỉ là tiếng Anh. Phiên bản Ultra của ngôn ngữ này sẽ ra mắt vào đầu năm sau, hướng đến đối tượng sử dụng là các nhà nghiên cứu, giáo sư, doanh nghiệp, v.v. Với phiên bản Nano, hiện tại các sản phẩm Google Pixel 8 Pro đã được trang bị.</div>
        </div>
        <div className='img-Article' >
            <img src="../public/Acticle.png"/>
        </div>
        <HeaderProduct title={"Bản Tin công nghệ"} />
        <NewTechnology></NewTechnology>
        </>

    )
}
export default newArticle;