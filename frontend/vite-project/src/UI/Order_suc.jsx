import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#ffd040"
            className="w-16 h-16 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Đặt Hàng Thành Công!
        </h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ để xác nhận thông tin và
          giao hàng sớm nhất có thể.
        </p>
        <Link
          to="/home"
          className="block w-full py-2 px-4 rounded-lg text-white font-semibold bg-[#ffd040] hover:bg-[#e0bc36] transition duration-300"
        >
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
