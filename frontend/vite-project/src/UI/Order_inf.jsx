import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Order_inf() {
  const [formData, setFormData] = useState({
    customer: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      // Kiểm tra số điện thoại có hợp lệ hay không
      if (!/^0\d{9}$/.test(value)) {
        setPhoneError("Số điện thoại phải đúng 10 số và bắt đầu bằng số 0");
      } else {
        setPhoneError("");
      }
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Đặt hàng thành công:", data);
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg ">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Thông Tin Đơn Hàng
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Khách Hàng
            </label>
            <input
              type="text"
              name="customer"
              placeholder="Nhập tên khách hàng"
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ffd040]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa Chỉ
            </label>
            <input
              type="text"
              name="address"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ffd040]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số Điện Thoại
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={(e) => {
                // Chặn các phím không phải số và các phím chức năng cần thiết
                if (
                  !/[0-9]/.test(e.key) && // Không phải số
                  e.key !== "Backspace" && // Cho phép xóa
                  e.key !== "Tab" && // Cho phép chuyển tab
                  e.key !== "ArrowLeft" && // Cho phép phím mũi tên trái
                  e.key !== "ArrowRight" // Cho phép phím mũi tên phải
                ) {
                  e.preventDefault();
                }
              }}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ffd040]"
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phương Thức Thanh Toán
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ffd040]"
            >
              <option value="COD">Thanh toán khi nhận hàng</option>
              <option value="Momo">Momo</option>
              <option value="Cart Credit">Thẻ tín dụng</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#ffd040] text-white rounded-lg hover:bg-[#ffd040] focus:outline-none focus:ring focus:ring-[#ffd040]"
          >
            Đặt hàng
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Order_inf;
