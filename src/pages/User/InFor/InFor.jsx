import '../InFor/InFor.css';
import { FaUserTag } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import AuthService from '../../../services/authService';
import { UserContext } from '../../../components/context/authContext';
import { showToastSuccess } from '../../../config/toastConfig';

const InFor = () => {
    const { user } = useContext(UserContext);
    const idUser = user.account.id;
    const [accounts, setAccounts] = useState({
        full_name: '',
        avatar: '',
        gender: null,
        address: '',
        email: ''
    });
    const [previewSrc, setPreviewSrc] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataUser = await AuthService.getOneUser(idUser); // Gọi API để lấy danh sách tài khoản
                if (dataUser && dataUser.EC === 0) {
                    const normalizedData = {
                        ...dataUser.data,
                        gender: parseInt(dataUser.data.gender), // Đảm bảo giá trị gender là số
                    };
                    setAccounts(normalizedData);
                }
            } catch (error) {
                console.log("Lỗi khi fetch dữ liệu: ", error);
            }
        };
        fetchData();
    }, []);

    const handleGenderChange = (event) => {
        setAccounts({
            ...accounts,
            gender: parseInt(event.target.value)
        })
    };

    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewSrc(previewURL); // Lưu URL tạm thời của ảnh xem trước
        }
    }
    const handleAddressChange = (event) => {
        setAccounts({
            ...accounts,
            address: event.target.value
        })
    };

    const handleUpdate = async () => {
        const formData = new FormData()

        formData.append('gender', accounts.gender)
        formData.append('address', accounts.address)

        // Kiểm tra nếu người dùng đã tải lên file mới
        const fileInput = document.getElementById('file-upload');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('avatar', fileInput.files[0]); // Chỉ thêm file nếu có file mới
        }
        const dataUpdate = await AuthService.updateUser(idUser, formData)
        if (dataUpdate && dataUpdate.EC === 0) {
            showToastSuccess(dataUpdate.message)

            // Lấy thông tin user từ localStorage
            const userLocalStorage = JSON.parse(localStorage.getItem('userInfo'));

            if (userLocalStorage && userLocalStorage.account) {
                // Cập nhật avatar trong userInfo
                userLocalStorage.account.avatar = dataUpdate.data.avatar;

                // Lưu lại vào localStorage
                localStorage.setItem('userInfo', JSON.stringify(userLocalStorage));
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        }
    }

    return (
        <div className='main_infor'>
            {accounts && (
                <>
                    <div className='name_infor'>
                        <FaUserTag className='icon_infor' />
                        <hr />
                        <p className="name_if">Hồ Sơ Của Tôi</p>
                    </div>
                    <div className="infor_Content">
                        <div className="infor_avata">
                            <img
                                src={previewSrc || `${import.meta.env.VITE_API_URL}/uploads/${accounts.avatar}`}
                                id="profile-picture"
                                alt="Preview"
                                style={{ width: "80px", height: '80px', borderRadius: '50%' }}
                            />
                            <label htmlFor="file-upload">Chọn Ảnh</label>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".jpg, .jpeg, .png"
                                onChange={previewImage}
                            />
                        </div>
                        <div className="infor">
                            <div className='ten_infor'>
                                <label htmlFor='hovaten'>Họ và tên: </label>
                                <span className='hovaten'>{accounts.full_name} </span>
                            </div>

                            <div className='email_infor'>
                                <p>Email:</p>
                                <span className='span-email'>{accounts.email} </span>
                            </div>
                            <div className='phone_infor'>
                                <p>Phone:</p>
                                <span className='span-phone'>{accounts.phone} </span>
                            </div>
                            <div className="gender-selection">
                                <div className='gt'>Giới tính:</div>
                                <div className="gender-option">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value='0'
                                        checked={accounts.gender === 0}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="male">Nam</label>
                                </div>
                                <div className="gender-option">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="1"
                                        checked={accounts.gender === 1}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="female">Nữ</label>
                                </div>
                                <div className="gender-option">
                                    <input
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        value="2"
                                        checked={accounts.gender === 2}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="other">Khác</label>
                                </div>
                            </div>
                            <div className="address-selection">
                                <label htmlFor="address">Địa chỉ:</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={accounts.address}
                                    onChange={handleAddressChange}
                                    placeholder="Nhập địa chỉ của bạn"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <button className='btn_btn_infor' onClick={handleUpdate}>Lưu</button>
        </div>
    );
}

export default InFor;
