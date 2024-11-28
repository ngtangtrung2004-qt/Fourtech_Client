import '../InFor/InFor.css';
import { FaUserTag } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import AuthService from '../../../services/authService';
import { UserContext } from '../../../components/context/authContext';

const InFor = () => {
    const { user } = useContext(UserContext);
    const idUser = user.account.id;
    const [address, setAddress] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [selectedGender, setSelectedGender] = useState("male"); // Giá trị mặc định là "male"
    const [imageSrc, setImageSrc] = useState("../src/assets/images/avatar-mac-dinh.png");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataUser = await AuthService.getOneUser(idUser); // Gọi API để lấy danh sách tài khoản
                if (dataUser && dataUser.EC === 0) {
                    setAccounts(dataUser.data); // Lưu dữ liệu vào state
                }
            } catch (error) {
                console.log("Lỗi khi fetch dữ liệu: ", error);
            }
        };
        fetchData();
    }, []);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
        }
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value); // Cập nhật địa chỉ
    };

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
                            <img src={imageSrc} id="profile-picture" />
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
                                        value="male"
                                        checked={selectedGender === "male"}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="male">Nam</label>
                                </div>
                                <div className="gender-option">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={selectedGender === "female"}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="female">Nữ</label>
                                </div>
                                <div className="gender-option">
                                    <input
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        value="other"
                                        checked={selectedGender === "other"}
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
                                    value={address}
                                    onChange={handleAddressChange}
                                    placeholder="Nhập địa chỉ của bạn"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <button className='btn_btn_infor'>Lưu</button>
        </div>
    );
}

export default InFor;
