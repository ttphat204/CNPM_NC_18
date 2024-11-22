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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const account_id = localStorage.getItem("userId");

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setErrorMessage(""); // Clear previous errors
      try {
        const response = await axios.get(
          `http://localhost:5000/api/accounts/info/${account_id}`
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setErrorMessage("Không thể lấy thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [account_id]);

  // Fetch orders (mock implementation)
  useEffect(() => {
    if (showOrderHistory) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/orders/${account_id}`
          );
          setOrders(response.data.orders || []);
        } catch (error) {
          console.error("Error fetching order history:", error);
          setErrorMessage("Không thể lấy lịch sử mua hàng.");
        }
      };

      fetchOrders();
    }
  }, [showOrderHistory, account_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateInfo = async () => {
    const { username, phone, email } = editableData;
    try {
      const response = await axios.put(
        "http://localhost:5000/api/accounts/info",
        { username, phone, email } // Send username instead of name
      );
      alert("Thông tin đã được cập nhật!");
      setUserData((prevState) => ({
        ...prevState,
        username: username || prevState.username,
        phone: phone || prevState.phone,
        email: email || prevState.email
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Cập nhật thông tin thất bại!");
    }
  };

  const handleEditMode = () => {
    setEditableData({ username: userData.username, phone: userData.phone, email: userData.email }); // Populate editableData with current userData
    setIsEditing(true);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin người dùng</h2>

          {loading ? (
            <p>Đang tải thông tin...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              {!isEditing ? (
                <div>
                  <p>
                    <strong>Tên:</strong> {userData.username || "Chưa có dữ liệu"}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>{" "}
                    {userData.phone || "Chưa có dữ liệu"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {userData.email || "Chưa có dữ liệu"}
                  </p>

                  <button
                    onClick={handleEditMode}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                  >
                    Chỉnh sửa thông tin
                  </button>
                </div>
              ) : (
                <div>
                  {["username", "phone", "email"].map((field) => (
                    <div className="mb-4" key={field}>
                      <label className="block mb-2 capitalize">
                        {field === "username" ? "Tên" : field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={editableData[field] || ""}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                  ))}
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
              )}

              <div>
                <button
                  onClick={() => setShowOrderHistory(!showOrderHistory)}
                  className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                >
                  {showOrderHistory
                    ? "Ẩn lịch sử mua hàng"
                    : "Xem lịch sử mua hàng"}
                </button>
              </div>

              {showOrderHistory && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Lịch sử mua hàng</h3>
                  {orders.length > 0 ? (
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
                            <td className="border border-gray-300 p-2">
                              {order.id}
                            </td>
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
                  ) : (
                    <p>Không có lịch sử mua hàng.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
