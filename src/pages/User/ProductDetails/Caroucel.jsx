import  { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DetailPrd.css'
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
function Carousel() {
    const images = [
      "../../../../public/hp-1.png",
      "../../../../public/hp-2.png",
      "../../../../public/hp-3.png",
      "../../../../public/hp-4.png",
    ]
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const handlePrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const handleNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    return ( 
        <>
        <div className='carousel'>
                <div className='img-detail'>
                    <img src={images[currentIndex]} alt="carousel" />
                </div>
                <div className='img-action'>
                    <FontAwesomeIcon icon={faChevronLeft} className='action-icon' onClick={handlePrev}/>
                    <div className='action-image'>
                        <>
                        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              border: index === currentIndex ? "2px solid red" : "2px solid transparent",
              cursor: "pointer",
            }}
          />
        ))}
                        </>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className='action-icon' onClick={handleNext}/>
                </div>
            </div>
        </>
     );
}

export default Carousel;