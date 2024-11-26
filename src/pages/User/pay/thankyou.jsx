import { Button, Result } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Thankyou() {
    const [searchParams] = useSearchParams();
    const orderIdParam = searchParams.get('orderId'); // Lấy trạng thái từ URL
    return (
        <>
            {orderIdParam && (
                <Result
                    status="success"
                    title="Cảm ơn bạn đã đặt hàng"
                    subTitle={`Mã đơn hàng: ${orderIdParam || 'Không xác định'}. Đơn hàng sẽ đến bạn trong vòng 4-7 ngày.`}
                    extra={[
                        <Button type="primary" key="console">
                            <Link to={'/'}>
                                Trở về trang chủ
                            </Link>
                        </Button>
                    ]}
                />
            )}
        </>
    );
}

export default Thankyou;