import './Event.css'

const Event = () => {
  return (
    <>
      <div className="container-event">
        <div className="item-event">
          <img className='img' src="./event.png" alt="" />
          <div className='description'>
            <h3>GIẢM GIÁ NHẬP HỌC 30%</h3>
            <p>Tai nghe, phụ kiện</p>
          </div>
        </div>
        <div className="item-event">
          <img className='img' src="./event1.png" alt="" />
          <div className='description'>
            <h3>ƯU ĐÃI MÙA HÈ ĐẾN 60%</h3>
            <p>Laptop, phụ kiện máy tính</p>
          </div>
        </div>
        <div className="item-event">
          <img className='img' src="./event2.png" alt="" />
          <div className='description'>
            <h3>GIẢM 500K CHO ĐƠN 2TR</h3>
            <p>Laptop Gaming</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Event
