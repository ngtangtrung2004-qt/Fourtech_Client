import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import "./product.css";
// import ProductService from "../../../services/productService";
import { formatCurrency, formatDate } from "../../../config/config";
import ProductService from "../../../services/productService";
import { showToastSuccess } from "../../../config/toastConfig";

function TrashCanProduct() {

    const [products, setProducts] = useState([]);

    //DELETE
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false); // Modal xóa

    //RESTORE
    const [modalRestoreOpen, setModalRestoreOpen] = useState(false); // Modal khôi phục
    const [productId, setProductId] = useState(null); // Lưu ID của mục được chọn xóa


    useEffect(() => {
        fetchProductsTrash();
    }, []);

    const fetchProductsTrash = async () => {
        try {
            const dataProduct = await ProductService.getAllProductTrash();

            if (dataProduct && dataProduct.length > 0) {
                const formatData = dataProduct.map((pro, index) => ({
                    ...pro,
                    key: pro.id,
                    index: index + 1,
                    image: pro.image && Array.isArray(pro.image) ? pro.image : []
                }));
                setProducts(formatData);
            } else {
                setProducts([])
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleRestore = async () => {
        try {
            if (productId) {
                const brand = await ProductService.restoreProduct(productId);
                if (brand && brand.EC === 0) {
                    showToastSuccess(brand.message);
                    await fetchProductsTrash();
                    setModalDeleteOpen(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async () => {
        try {
            if (productId) {
                const product = await ProductService.deleteProduct(productId);
                if (product && product.EC === 0) {
                    showToastSuccess(product.message);
                    await fetchProductsTrash();
                    setModalDeleteOpen(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            render: (text) => {
                const maxLength = 40;
                if (text && text.length > maxLength) {
                    return (
                        <span title={text}>
                            {text.slice(0, maxLength) + "..."}
                        </span>
                    );
                }
                return <span title={text}>{text}</span>;
            }
        },
        {
            title: "Danh mục",
            dataIndex: "category_name",
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand_name",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            render: (images) => {
                return (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexWrap: "wrap", gap: "10px" }}>
                        {images.slice(0, 2).map((src, index) => (
                            <img
                                key={index}
                                src={import.meta.env.VITE_API_URL + "/uploads/" + src}
                                alt={`Product ${index + 1}`}
                                title={src}
                                style={{ width: "50px", height: "50px" }}
                            />
                        ))}
                    </div>
                );
            },
        },
        {
            title: "Giá gốc",
            dataIndex: "price",
            render: (text) => formatCurrency(text)
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "promotion_price",
            render: (text) => {
                if (text === 0) {
                    return <p>Không có giá khuyến mãi</p>
                } else {
                    return <p>{formatCurrency(text)}</p>
                }
            }
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (text) => {
                const maxLength = 50;
                if (text && text.length > maxLength) {
                    return (
                        <span title={text}>
                            {text.slice(0, maxLength) + "..."}
                        </span>
                    );
                }
                return <span title={text}>{text}</span>;
            }
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Lượt xem",
            dataIndex: "view",
        },
        {
            title: "Ngày thêm",
            dataIndex: "created_at",
            render: (text) => formatDate(text)
        },
        {
            title: "Thao tác",
            render: (text, record) => (
                <span className="action-product">
                    <Button type="primary" style={{ width: '100%' }}
                        onClick={() => {
                            setProductId(record.id); // Lưu ID danh mục để khôi phục
                            setModalRestoreOpen(true); // Mở modal xác nhận để khôi phục
                        }}
                    >
                        Khôi phục
                    </Button>

                    <Modal
                        title="Xác nhận khôi phục!"
                        centered
                        open={modalRestoreOpen && productId === record.id} // Mở modal chỉ khi ID trùng với mục đang chọn
                        onOk={handleRestore}
                        okText="Khôi phục"
                        okButtonProps={{ className: "custom-ok-button" }} // Tùy chỉnh nút OK
                        onCancel={() => setModalRestoreOpen(false)} // Đóng modal khi nhấn Hủy
                        cancelText="Hủy"
                        getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
                    >
                        <p>
                            Bạn muốn khôi phục sản phẩm: <b>{record.name}</b>
                        </p>
                    </Modal>

                    <Button
                        type="primary"
                        danger
                        style={{ width: '100%' }}
                        onClick={() => {
                            setProductId(record.id); // Lưu ID danh mục để xóa
                            setModalDeleteOpen(true); // Mở modal xác nhận xóa
                        }}
                    >
                        Xóa vĩnh viễn
                    </Button>

                    <Modal
                        title="Xác nhận xóa vĩnh viễn!"
                        centered
                        open={modalDeleteOpen && productId === record.id} // Mở modal chỉ khi ID trùng với mục đang chọn
                        onOk={handleDelete}
                        okText="Xóa"
                        okButtonProps={{ className: "custom-ok-button" }} // Tùy chỉnh nút OK
                        onCancel={() => setModalDeleteOpen(false)} // Đóng modal khi nhấn Hủy
                        cancelText="Hủy"
                        getContainer={false} // Render modal bên trong DOM thay vì toàn bộ body
                    >
                        <p>
                            Bạn muốn xóa vĩnh viễn sản phẩm: <b>{record.name}</b>
                        </p>
                    </Modal>

                </span>
            ),
        },
    ];

    return (
        <>
            <div className="add-product">
                <h2>Thùng rác</h2>
            </div>
            {products && products.length === 0 ?
                <>
                    <h3>Hiện tại không có sản phẩm nào trong thùng rác.</h3>
                </>
                :
                <>
                    <Table
                        columns={columns}
                        dataSource={products}
                        pagination={{
                            pageSize: 5,
                        }}
                    />
                </>
            }
        </>
    );
}

export default TrashCanProduct;
