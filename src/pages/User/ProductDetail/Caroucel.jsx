import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DetailPrd.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import PropTypes from "prop-types";
function Carousel({ imageDetailPrd }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!imageDetailPrd || imageDetailPrd.length === 0) {
    return <div className="carousel">Không có hình ảnh để hiển thị</div>;
  }

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? imageDetailPrd.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === imageDetailPrd.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <>
      <div className="carousel">
        <div className="img-detail">
          <div className="detail-img">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${
                imageDetailPrd[currentIndex]
              }`}
              alt="carousel"
            />
          </div>
        </div>
        <div className="action-image">
          <div className="img-action">
            <>
              <div className="action-icon" onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
              {imageDetailPrd.map((image, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_API_URL}/uploads/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    border:
                      index === currentIndex
                        ? "2px solid red"
                        : "2px solid transparent",
                    cursor: "pointer",
                    height: '60px',
                    width: '60px'
                  }}
                />
              ))}
              <div className="action-icon" onClick={handleNext}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
Carousel.propTypes = {
  imageDetailPrd: PropTypes.arrayOf(PropTypes.string),
};
export default Carousel;
