import './Event.css'

const Event = () => {
  return (
    <>
      <div className="event-container">
        <div className="item-Event">
          <img src="./event.png" alt="" />
          <p>Giảm Giá Nhập Học 30%</p>
          <h3>Tai nghe, phụ kiện</h3>
        </div>
        <div className="item-Event-1">
          <img className='img' src="./event.png" alt="" />
          <p>Ưu đãi mùa hè đến 60%</p>
          <h3>Tai nghe, phụ kiện</h3>
        </div>
        <div className="item-Event-2">
          <img className='img' src="./event.png" alt="" />
          <p>GIẢM 500k CHO ĐƠN 2TR</p>
          <h3>Tai nghe, phụ kiện</h3>
        </div>
      </div>
      
    </>
  )
}

export default Event
