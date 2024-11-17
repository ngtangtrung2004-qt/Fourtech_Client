import { Button, Result } from "antd";

function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Rất tiếc, trang bạn đã truy cập không tồn tại ..."
            extra={<Button href="/" type="primary">Trở Về Trang Chủ</Button>}
        />
    );
}

export default NotFound;
