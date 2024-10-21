import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { ChevronDownIcon, UserIcon, CubeIcon, ClipboardCheckIcon, OfficeBuildingIcon, TagIcon, CollectionIcon, ChartBarIcon } from '@heroicons/react/solid';
// import TrafficData from './components/Traffic';


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




const Dashboard = () => {


  const [trafficData, setTrafficData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Gọi API lấy dữ liệu traffic
    fetch('http://localhost:5000/api/traffic')
      .then((response) => response.json())
      .then((data) => {
        setTrafficData(data.traffic);
        formatChartData(data.traffic);
      })
      .catch((error) => console.error('Error fetching traffic data:', error));
  }, []);

  // Xử lý dữ liệu để hiển thị trên biểu đồ
  const formatChartData = (traffic) => {
    const labels = traffic.map((item) => new Date(item.timestamp).toLocaleDateString());
    const amounts = traffic.map((item) => item.amount);

    setChartData({
      labels: labels, // Gán các nhãn ngày tháng
      datasets: [
        {
          label: 'Amount Transferred', // Nhãn dữ liệu
          data: amounts, // Dữ liệu là amount của traffic
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };



  const [showUserMenu, setShowUserMenu] = useState(false); // Trạng thái cho menu người dùng
  const [showProductMenu, setShowProductMenu] = useState(false); // Trạng thái cho menu quản lý sản phẩm
  const [showOrderMenu, setShowOrderMenu] = useState(false);// Trạng thái cho menu quản lý đơn hàng
  const [showNCCMenu, setShowNCCMenu] = useState(false);
  const [showDiscount, setDiscoiunt] = useState(false);
  const [showCategory, setCategory] = useState(false);
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
      <nav className="w-64 bg-[#FFD040] text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Menu Admin</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center hover:text-gray-300">
              <ChartBarIcon className="w-5 h-5 mr-2" />
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
                  <a href="#" className="hover:text-gray-300">Danh sách người dùng</a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button onClick={() => setShowProductMenu(!showProductMenu)} className="flex items-center hover:text-gray-300 w-full text-left">
              <CubeIcon className="w-5 h-5 mr-2" />
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
              <ClipboardCheckIcon className="w-5 h-5 mr-2" />
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
            <button onClick={() => setShowNCCMenu(!showNCCMenu)} className="flex items-center hover:text-gray-300 w-full text-left">
              <OfficeBuildingIcon className="w-5 h-5 mr-2" />
              Quản lý nhà cung cấp
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${showNCCMenu ? 'rotate-180' : ''}`} />
            </button>
            {showNCCMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Thêm nhà cung cấp</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Danh sách nhà cung cấp</a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button onClick={() => setDiscoiunt(!showDiscount)} className="flex items-center hover:text-gray-300 w-full text-left">
              <TagIcon className="w-5 h-5 mr-2" />
              Quản lý khuyến mãi
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${showDiscount ? 'rotate-180' : ''}`} />
            </button>
            {showDiscount && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Thêm khuyến mãi</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Danh sách khuyến mãi</a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button onClick={() => setCategory(!showCategory)} className="flex items-center hover:text-gray-300 w-full text-left">
              <CollectionIcon className="w-5 h-5 mr-2" />
              Quản lý danh mục
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${showCategory ? 'rotate-180' : ''}`} />
            </button>
            {showCategory && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Thêm danh mục</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">Danh sách danh mục</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2">Số lượng người dùng</h2>
            <p className="text-2xl text-red-500">{userCount}</p>
            <h2 className="text-lg font-semibold mb-2">Hiện đã tạo tài khoản sử dụng</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Doanh số</h2>
            <Bar data={salesData} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Lưu lượng truy cập</h2>
            {trafficData.length > 0 ? (
              <ul>
                {trafficData.map((traffic, index) => (
                  <li key={index}>
                    <strong>Người dùng:</strong> {traffic.accountId?.username || 'Không xác định'} <br />
                    <strong>Thời gian:</strong> {new Date(traffic.timestamp).toLocaleString()} <br />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có lưu lượng truy cập nào.</p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
