import { useState } from "react";
import { Button, Modal } from "antd";
function EditCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Sửa category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <form>
          <div className="name_category">
            <p>Name category</p>
            <input type="text" />
          </div>
          <div className="name_category">
            <p>Image</p>
            <input type="text" />
          </div>
          <button className="btn-edit">Sửa</button>
        </form>
      </Modal>
    </>
  );
}

export default EditCategory;
