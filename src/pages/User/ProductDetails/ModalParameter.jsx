// import React from 'react';
// import {  Modal } from 'antd';

import "./DetailPrd.css";

function ModalParameter() {
    // const [open, setOpen] = React.useState(false);
  // const showLoading = () => {
  //   setOpen(true);
  // };
    return ( <>
    <div className="table-container">
  <table className="table"> {/* Corrected className here */}
    <tr>
      <th>Thời lượng pin tai nghe:</th>
      <td>Dùng 100 giờ - Sạc 3 giờ</td>
    </tr>
    <tr>
      <th>Cổng sạc:</th>
      <td>Type-C</td>
    </tr>
    <tr>
      <th>Công nghệ âm thanh:</th>
      <td>Marshall Signature Sound<br />EQ Sound<br />Driver 40 mm</td>
    </tr>
    <tr>
      <th>Tương thích:</th>
      <td>macOS<br />Android, iOS, Windows</td>
    </tr>
    <tr>
      <th>Ứng dụng kết nối:</th>
      <td>Marshall Bluetooth</td>
    </tr>
  </table>
  {/* <div className="btn-container">
    <button className="detail-button">
      Xem chi tiết 
    </button>
  </div> */}
</div>

{/* <Modal
        title={<h4 className='modal_title'>Chi tiết thông số</h4>}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={()=>setOpen(false)}
        
      >
        <div className='parameter_detail'>
    <table className="table"> 
    <tr>
      <th>Thời lượng pin tai nghe:</th>
      <td>Dùng 100 giờ - Sạc 3 giờ</td>
    </tr>
    <tr>
      <th>Cổng sạc:</th>
      <td>Type-C</td>
    </tr>
    <tr>
      <th>Công nghệ âm thanh:</th>
      <td>Marshall Signature Sound<br />EQ Sound<br />Driver 40 mm</td>
    </tr>
    <tr>
      <th>Tương thích:</th>
      <td>macOS<br />Android, iOS, Windows</td>
    </tr>
    <tr>
      <th>Ứng dụng kết nối:</th>
      <td>Marshall Bluetooth</td>
    </tr>
    <tr>
      <th>Jack cắm:</th>
      <td>3.5 mm</td>
    </tr>
    <tr>
      <th>Tiện ích:</th>
      <td>Thiết kế công thái học<br />Spotify TAP<br />Sạc không dây<br />Micro chống ồn, lọc gió</td>
    </tr>
  </table>

        </div>
      </Modal> */}
    </> );
}

export default ModalParameter;