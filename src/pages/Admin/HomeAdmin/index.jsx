import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { formatCurrency } from '../../../config/config';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function HomeAdmin() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt"); // Lấy token từ localStorage
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard-data`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Gửi token trong header
                        },
                    }
                );
                const data = response.data.data;
                setDashboardData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Something went wrong');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { totalRevenue, monthlyRevenue, bestSellingProduct } = dashboardData;

    const chartData = {
        labels: monthlyRevenue.map(item => item.month),
        datasets: [
            {
                label: 'Doanh thu theo tháng (VND)',
                data: monthlyRevenue.map(item => item.totalSales),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                categoryPercentage: 0.4, // Thu nhỏ nhóm cột
                barPercentage: 0.8, // Thu nhỏ cột trong nhóm
            },
        ],
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Dashboard</h2>
            <div>
                <p style={{ fontSize: '20px' }}>
                    <strong>Tổng doanh thu: </strong>
                    {formatCurrency(totalRevenue)}
                </p>

                <p style={{ fontSize: '20px' }}>
                    <strong>Sản phẩm bán chạy nhất: </strong>
                    {bestSellingProduct?.name} ({bestSellingProduct?.totalSold} sản phẩm)
                </p>
            </div>

            <div style={{ width: '60%', margin: '10px auto', textAlign: 'center' }}>
                <h3>Biểu đồ doanh thu theo tháng</h3>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Doanh thu theo tháng',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default HomeAdmin;
