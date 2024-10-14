import  { useState, useEffect } from "react";
import './sale.css';

const Sale = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the target date to 2 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);

  const calculateTimeLeft = () => {
    const now = new Date().getTime(); // Get current time in milliseconds
    const difference = targetDate.getTime() - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="deal-banner">
      <div className="deal-title">
        <span className="lightning-icon">⚡</span>
        <span>GIỜ VÀNG DEAL SỐC</span>
      </div>
      <div className="countdown-container">
        <p>Nhanh lên nào! <br />Sự kiện sẽ kết thúc sau</p>
        <div className="countdown">
          <div className="time-box">
            <span className="number">{time.days}</span>
            <span className="label">Ngày</span>
          </div>
          <div className="time-box">
            <span className="number">{time.hours}</span>
            <span className="label">Giờ</span>
          </div>
          <div className="time-box">
            <span className="number">{time.minutes}</span>
            <span className="label">Phút</span>
          </div>
          <div className="time-box">
            <span className="number">{time.seconds}</span>
            <span className="label">Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
