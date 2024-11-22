import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/sidebar1";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0); // Số lượng người dùng
  const [totalRevenue, setTotalRevenue] = useState(0); // Tổng doanh thu
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh số ($)",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Hàm gọi API lấy số lượng người dùng
  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/accounts/count");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserCount(data.count || 0);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Hàm gọi API lấy danh sách đơn hàng
  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const orders = await response.json();

      // Tính tổng doanh thu
      let calculatedTotalRevenue = 0;
      orders.forEach((order) => {
        order.items.forEach((item) => {
          const price = item.product_id.price || 0;
          const quantity = item.quantity || 0;
          calculatedTotalRevenue += price * quantity;
        });
      });

      setTotalRevenue(calculatedTotalRevenue);

      // Cập nhật dữ liệu biểu đồ
      setSalesData((prevState) => ({
        ...prevState,
        labels: ["Tổng doanh thu"],
        datasets: [
          {
            ...prevState.datasets[0],
            data: [calculatedTotalRevenue],
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchOrderData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tổng số lượng người dùng */}
          <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 text-blue-400">
              Số lượng người dùng
            </h2>
            <p className="text-2xl text-red-500">{userCount}</p>
          </div>

          {/* Tổng doanh thu */}
          <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 text-green-400">
              Tổng doanh thu
            </h2>
            <p className="text-2xl text-red-500">
              {totalRevenue.toLocaleString()} VND
            </p>
          </div>

          {/* Biểu đồ doanh số */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Doanh số</h2>
            <Bar data={salesData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
