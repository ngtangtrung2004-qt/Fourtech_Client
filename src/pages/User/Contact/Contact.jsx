import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './contact.css'

function Contact() {
    return ( 
        <>
        <div className="contact-form-container">
            <div className="form-section">
                <h2>ĐỂ LẠI LỜI NHẮN</h2>
                <form>
                    <label htmlFor="name">Họ và tên:</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="email">Địa chỉ email:</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="phone">Số điện thoại:</label>
                    <input type="text" id="phone" name="phone" />

                    <label htmlFor="message">Lời nhắn:</label>
                    <textarea id="message" name="message" rows="4"></textarea>

                    <button type="submit" className="submit-button">GỬI TIN NHẮN</button>
                </form>
            </div>
            <div className="contact-info-section">
                <h3>Hãy liên hệ với chúng tôi!</h3>
                <p><FontAwesomeIcon icon="fa-solid fa-location-dot" />
                16 Kiệt 20 Nguyễn Huy Tưởng</p>
                <p><FontAwesomeIcon icon="fa-solid fa-phone" /> 0919907233 - 094 606 8898</p>

                <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1917.12739694021!2d108.16776972745224!3d16.052262620738546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142196d9a203685%3A0x4e8027fe58d65525!2zQ2FvIMSR4bqzbmcgRlBUIEPGoSBT4bufIDI!5e0!3m2!1svi!2s!4v1730792976732!5m2!1svi!2s"
    width="600"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
/>
            </div>
        </div>

       
        </>
     );
}

export default Contact;