import './Voucher.css'
const Voucher = () => {
  return (
    <>
      <div className="item-Voucher">
        <div className='voucher-container'>
          <div className="code-Voucher">
            <span className='code'>Mã: 312HB70K</span>
            <span className='date'>HSD:17/01/2025</span>
          </div>
          <p className='descripsion'>Giảm 12% cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 250K</p>
          <div className='bt'>
            <button className='btn-left'>Điều kiện</button>
            <button className='btn-right'>Hết hạn</button>
          </div>
        </div>
        <div className='voucher-container'>
          <div className="code-Voucher">
            <span className='code'>Mã: FACN0212</span>
            <span className='date'>HSD:20/12/2024</span>
          </div>
          <p className='descripsion'>Giảm 15% cho đơn hàng giá trị tối thiểu 2tr. Mã giảm tối đa 1tr</p>
          <div className='bt'>
            <button className='btn-left'>Điều kiện</button>
            <button className='btn-right'>Hết hạn</button>
          </div>
        </div>
        <div className='voucher-container'>
          <div className="code-Voucher">
            <span className='code'>Mã: MGMKT2</span>
            <span className='date'>HSD:11/12/2024</span>
          </div>
          <p className='descripsion'>Giảm 8% cho đơn hàng giá trị tối thiểu 1tr. Mã giảm tối đa 1tr</p>
          <div className='bt'>
            <button className='btn-left'>Điều kiện</button>
            <button className='btn-right'>Hết hạn</button>
          </div>
        </div>
        <div className='voucher-container'>
          <div className="code-Voucher">
            <span className='code'>Mã: KRBAUP2</span>
            <span className='date'>HSD:11/12/2024</span>
          </div>
          <p className='descripsion'>Giảm 12% cho đơn hàng giá trị tối thiểu 300k. Mã giảm tối đa 250K</p>
          <div className='bt'>
            <button className='btn-left'>Điều kiện</button>
            <button className='btn-right'>Hết hạn</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Voucher;
