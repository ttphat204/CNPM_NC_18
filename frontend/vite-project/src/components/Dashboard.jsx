import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { ChevronDownIcon, UserIcon, DocumentReportIcon, CogIcon } from '@heroicons/react/solid';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

// Dữ liệu biểu đồ doanh số
const salesData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Doanh số ($)',
      data: [12000, 15000, 10000, 18000, 19000, 22000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// Dữ liệu biểu đồ lưu lượng truy cập
const trafficData = {
  labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
  datasets: [
    {
      label: 'Lượng truy cập',
      data: [500, 700, 1200, 900],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      fill: true,
    },
  ],
};

const Dashboard = () => {
  const [showUserMenu, setShowUserMenu] = useState(false); // Trạng thái cho menu người dùng
  const [showProductMenu, setShowProductMenu] = useState(false); // Trạng thái cho menu quản lý sản phẩm
  const [showOrderMenu, setShowOrderMenu] = useState(false); // Trạng thái cho menu quản lý đơn hàng
  const [userCount, setUserCount] = useState(0); // Trạng thái cho số lượng người dùng

  // Hàm gọi API để lấy số lượng người dùng
 const fetchUserCount = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/accounts/count'); // Gọi endpoint mới
    console.log('Response:', response);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Data received:', data);

    // Kiểm tra nếu data.count có sẵn
    if (data && data.count !== undefined) {
      setUserCount(data.count);
    } else {
      console.error('Count not found in response data');
    }
  } catch (error) {
    console.error('Error fetching user count:', error);
  }
};




  useEffect(() => {
    fetchUserCount(); // Gọi API khi component được mount
  }, []);

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Menu Admin</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center hover:text-gray-300">
              <UserIcon className="w-5 h-5 mr-2" />
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center hover:text-gray-300 w-full text-left">
              <UserIcon className="w-5 h-5 mr-2" />
              Quản lý người dùng
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>
            {showUserMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Thêm người dùng</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Danh sách người dùng</a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button onClick={() => setShowProductMenu(!showProductMenu)} className="flex items-center hover:text-gray-300 w-full text-left">
              <DocumentReportIcon className="w-5 h-5 mr-2" />
              Quản lý sản phẩm
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${showProductMenu ? 'rotate-180' : ''}`} />
            </button>
            {showProductMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Thêm sản phẩm</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Danh sách sản phẩm</a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button onClick={() => setShowOrderMenu(!showOrderMenu)} className="flex items-center hover:text-gray-300 w-full text-left">
              <DocumentReportIcon className="w-5 h-5 mr-2" />
              Quản lý đơn hàng
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${showOrderMenu ? 'rotate-180' : ''}`} />
            </button>
            {showOrderMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Danh sách đơn hàng</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Theo dõi đơn hàng</a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center hover:text-gray-300">
              <CogIcon className="w-5 h-5 mr-2" />
              Cài đặt
            </a>
          </li>
        </ul>
      </nav>

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Thông tin doanh thu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Số lượng người dùng</h3>
            <p className="text-3xl font-bold"><strong>{userCount}</strong></p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Doanh số hàng tháng</h3>
            <Bar data={salesData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Lưu lượng truy cập website</h3>
            <Line data={trafficData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
