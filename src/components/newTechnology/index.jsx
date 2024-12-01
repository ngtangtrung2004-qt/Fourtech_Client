import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import './NewTechelogy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../config/config';
function NewTechnology({ data }) {
  // console.log(data[0].content)
  return (<>
    <div className="item-new grid" >
      {data.map((news, index) => {
        return (
          <div className="cart-new" key={index}>
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${news.image
              }`} alt="anh 1"></img>
            <div className="card-information">
              <h4 className="card-title" title={news.title}>{news.title}</h4>
              <p className="card-info" dangerouslySetInnerHTML={{ __html: news.content }} />
              <div className="card-action">
                <div className="card-date">
                  <span><FontAwesomeIcon icon={faCalendarDay} /></span>
                  <span>{formatDate(news.createdAt)}</span>
                </div>
                <Link to={`/NewsDetail/${news.id}`} ><button className="card-btn"> Xem chi tiết</button></Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </>);
}

NewTechnology.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default NewTechnology;