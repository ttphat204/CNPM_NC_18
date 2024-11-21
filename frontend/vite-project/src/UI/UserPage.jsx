import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [orders, setOrders] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock accountId, replace with actual value.
  const accountId = "123";

  useEffect(() => {
    // Fetch user info và order history
    const fetchUserInfoAndOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/accounts/info/${accountId}`
        );
        console.log("User Info and Orders Response:", response.data);

        // Set user data và lịch sử đơn hàng từ response
        setUserData(response.data.user);
        setOrders(response.data.orders);

        // Chuẩn bị dữ liệu có thể chỉnh sửa
        setEditableData({
          name: response.data.user.name,
          phone: response.data.user.phone,
          email: response.data.user.email,
          address: response.data.user.address,
        });
      } catch (error) {
        console.error("Error fetching user data and orders", error);
      }
    };

    fetchUserInfoAndOrders();
  }, [accountId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateInfo = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/accounts/info",
        editableData
      );
      alert("Thông tin đã được cập nhật!");
      setUserData((prevState) => ({
        ...prevState,
        ...editableData, // update all fields with the edited data
      }));
      setIsEditing(false); // Turn off editing mode
    } catch (error) {
      console.error("Error updating user data", error);
      alert("Cập nhật thông tin thất bại!");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin người dùng</h2>

          {/* Display User Data if not in editing mode */}
          {!isEditing ? (
            <div>
              <p>
                <strong>Tên:</strong> {userData.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {userData.phone}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {userData.address}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          ) : (
            <div>
              {/* Editable Fields */}
              <div className="mb-4">
                <label className="block mb-2">Tên</label>
                <input
                  type="text"
                  name="name"
                  value={editableData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={editableData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={editableData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={editableData.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <button
                  onClick={handleUpdateInfo}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Cập nhật thông tin
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded ml-4"
                >
                  Hủy chỉnh sửa
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              onClick={() => setShowOrderHistory(!showOrderHistory)}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Xem lịch sử mua hàng
            </button>
          </div>

          {showOrderHistory && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Lịch sử mua hàng</h3>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Mã đơn hàng</th>
                    <th className="border border-gray-300 p-2">Ngày</th>
                    <th className="border border-gray-300 p-2">Sản phẩm</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border border-gray-300 p-2">{order.id}</td>
                      <td className="border border-gray-300 p-2">
                        {order.date}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {order.products.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
