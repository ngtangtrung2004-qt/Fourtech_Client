import '../InFor/InFor.css'
import { FaUserTag } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import AuthService from '../../../services/authService';
import { UserContext } from '../../../components/context/authContext';




const InFor = () => {

    const { user } = useContext(UserContext)

    const idUser = user.account.id

    const [accounts, setAccounts] = useState([]);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

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

    console.log(accounts)


    // Tạo danh sách các ngày (1-31)
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    // Tạo danh sách các tháng
    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];
    // Tạo danh sách các năm (1900 - hiện tại)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);


    const [selectedGender, setSelectedGender] = useState("male"); // Giá trị mặc định là "male"

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const defaultImage = "../src/assets/images/avatar-mac-dinh.png";
    const [imageSrc, setImageSrc] = useState(defaultImage);

    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
        }
    }
    return (
        <>
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
                                <div className="name_tdn"></div>
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

                                <div className="dob-selection">
                                    <div className='SN'>Ngày sinh:</div>
                                    <select value={day} onChange={(e) => setDay(e.target.value)}>
                                        <option value="">Ngày</option>
                                        {days.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                        <option value="">Tháng</option>
                                        {months.map((m, index) => (
                                            <option key={index} value={m}>{m}</option>
                                        ))}
                                    </select>
                                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                                        <option value="">Năm</option>
                                        {years.map((y) => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <button className='btn_btn_infor'>Lưu</button>
            </div>
        </>
    )
}

export default InFor
