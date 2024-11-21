import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar1";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function ListOrder() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Quản lý đơn hàng được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái modal

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) throw new Error("Không thể lấy dữ liệu đơn hàng");
        const data = await response.json();
        setOrderList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openModal = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/details/${orderId}`
      );
      if (!response.ok)
        throw new Error("Không thể lấy thông tin chi tiết đơn hàng");
      const data = await response.json();
      setSelectedOrder(data);
      setIsModalOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Đang tải...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Lỗi: {error}</p>
      </div>
    );

  const exportToPDF = () => {
    const modalContent = document.querySelector(".modal-content"); // Chỉ lấy nội dung hóa đơn trong modal

    if (modalContent) {
      // Ẩn footer trước khi xuất
      const footer = modalContent.querySelector(".no-footer");
      if (footer) {
        footer.style.display = "none"; // Ẩn phần footer
      }

      // Sử dụng html2canvas để chụp nội dung HTML
      html2canvas(modalContent, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Chuyển canvas thành ảnh
        const pdf = new jsPDF("p", "mm", "a4"); // Tạo file PDF với kích thước A4

        // Xác định tỷ lệ để ảnh vừa khít với PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Thêm ảnh vào PDF
        pdf.save(`HoaDon_${selectedOrder._id}.pdf`); // Xuất file PDF

        // Hiện lại footer sau khi xuất
        if (footer) {
          footer.style.display = "flex"; // Hiện lại phần footer
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Danh sách đơn hàng
        </h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-300">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-700">
                  Mã đơn hàng
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-700">
                  Tên khách hàng
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-700">
                  Tổng tiền
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-700">
                  Thanh toán
                </th>
                <th className="py-3 px-4 border-b text-center text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 px-4 border-b text-left">{order._id}</td>
                  <td className="py-2 px-4 border-b text-left">
                    {order.customer}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {order.items
                      .reduce(
                        (total, item) =>
                          total + item.product_id.price * item.quantity,
                        0
                      )
                      .toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {order.is_payment ? "Đã thanh toán" : "Chưa thanh toán"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => openModal(order._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                      In đơn hàng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && selectedOrder && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
            style={{ zIndex: 1000 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-w-2xl modal-content">
              {" "}
              {/* Thêm class modal-content */}
              {/* Header */}
              <div className="border-b pb-4 mb-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                  HÓA ĐƠN BÁN HÀNG
                </h2>
                <p className="text-center text-gray-600">
                  Ngày lập:{" "}
                  {new Date(selectedOrder.date).toLocaleDateString("vi-VN")} -{" "}
                  {selectedOrder.time}
                </p>
              </div>
              {/* Customer Information */}
              <div className="mb-6">
                <p>
                  <strong>Khách hàng:</strong> {selectedOrder.customer}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {selectedOrder.address}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {selectedOrder.phone}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {selectedOrder.payment_method}
                </p>
                <p>
                  <strong>Trạng thái thanh toán:</strong>{" "}
                  {selectedOrder.is_payment
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </p>
                <p>
                  <strong>Ngày giao hàng:</strong>{" "}
                  {new Date(selectedOrder.date).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <strong>Giờ giao hàng:</strong> {selectedOrder.time}
                </p>
              </div>
              {/* Product List */}
              <div className="mb-6">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="border border-gray-300 px-4 py-2">#</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Tên sản phẩm
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Giá</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Số lượng
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr
                        key={item.product_id._id}
                        className="hover:bg-gray-100"
                      >
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.product_id.product_name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {item.product_id.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {(
                            item.product_id.price * item.quantity
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Total Section */}
              <div className="flex justify-end text-lg font-bold mb-6">
                <p>
                  Tổng tiền:{" "}
                  {selectedOrder.items
                    .reduce(
                      (total, item) =>
                        total + item.product_id.price * item.quantity,
                      0
                    )
                    .toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </p>
              </div>
              {/* Footer */}
              <div className="flex justify-end no-footer">
                {" "}
                {/* Thêm class no-footer */}
                <button
                  onClick={exportToPDF}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mr-5"
                >
                  Xuất PDF
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListOrder;
