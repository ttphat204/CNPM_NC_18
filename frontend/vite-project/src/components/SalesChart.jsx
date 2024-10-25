import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const SalesChart = () => {
    const [monthlySalesData, setMonthlySalesData] = useState([]);

    useEffect(() => {
        const fetchMonthlySalesData = async () => {
            try {
                const response = await axios.get('/api/products/monthly-sales'); // Gọi API lấy doanh số hàng tháng
                setMonthlySalesData(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu doanh số:', error);
            }
        };

        fetchMonthlySalesData();
    }, []);

    const chartData = {
        labels: monthlySalesData.map(data => data.product_name), // Gán nhãn cho các sản phẩm
        datasets: [
            {
                label: 'Doanh số hàng tháng ($)',
                data: monthlySalesData.map(data => data.sales), // Gán giá trị doanh số
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Doanh số hàng tháng</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default SalesChart;
