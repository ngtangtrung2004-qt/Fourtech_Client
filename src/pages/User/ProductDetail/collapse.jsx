import { useState } from 'react';
import "./DetailPrd.css";
import PropTypes from 'prop-types';

const Collapse = ({ title, children, isOpenByDefault=false }) => {
  // Sử dụng `isOpenByDefault` để đặt trạng thái ban đầu của `isOpen`
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  // Đổi màu nền dựa trên trạng thái mở/đóng
  const collapseHeaderStyle = {
    backgroundColor: isOpen ? '#FFDE50' : '#D9D9D9',  // Màu nền thay đổi khi mở
    border: isOpen ? 'none' : '1px solid #FF0000',    // Đã sửa chính tả 'border' và 'solid'               // Màu chữ thay đổi khi mở
  };
  

  return (
    <div className="collapse-container">
      <div
        className="collapse-header"
        style={collapseHeaderStyle}
        onClick={toggleCollapse}
      >
        <h3>{title}</h3>
        <div className='collapse_icon'>
        <span>{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      {isOpen && <div className="collapse-content">{children}</div>}
    </div>
  );
};

Collapse.propTypes = {
  title: PropTypes.string.isRequired, // `title` là chuỗi và là bắt buộc
  children: PropTypes.node,           // `children` có thể là bất kỳ React node nào
  isOpenByDefault: PropTypes.bool,    // `isOpenByDefault` xác định collapse có mở mặc định hay không
};
export default Collapse;
