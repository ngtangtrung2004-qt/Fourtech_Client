// toastConfig.js
import { toast } from 'react-toastify';

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false, //nếu là true thì thanh hiển thị thời gian sẽ không hiển thị
  closeOnClick: true, //Nếu true, thanh tiến trình sẽ không hiển thị.
  pauseOnHover: true, //Nếu true, toast sẽ tạm dừng thời gian tự động đóng khi người dùng di chuột qua nó.
  draggable: true, //Nếu true, người dùng có thể kéo toast để đóng nó.
  progress: undefined,
  theme: "colored",
};

export const showToastSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const showToastError = (message) => {
  toast.error(message, toastConfig);
};

export const showToastWarning = (message) => {
  toast.warning(message, toastConfig);
};
