import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
import {
  ChevronDownIcon,
  UserIcon,
  CubeIcon,
  ClipboardCheckIcon,
  OfficeBuildingIcon,
  TagIcon,
  CollectionIcon,
  ChartBarIcon,
} from "@heroicons/react/solid";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const AddCategory = () => {
  const [showUserMenu, setShowUserMenu] = useState(false); // Trạng thái cho menu người dùng
  const [showProductMenu, setShowProductMenu] = useState(false); // Trạng thái cho menu quản lý sản phẩm
  const [showOrderMenu, setShowOrderMenu] = useState(false); // Trạng thái cho menu quản lý đơn hàng
  const [showNCCMenu, setShowNCCMenu] = useState(false);
  const [showDiscount, setDiscoiunt] = useState(false);
  const [showCategory, setCategory] = useState(false);

  const [NCCs, setNCCs] = useState([]);

  useEffect(() => {
    // Fetch NCC created by admin
    axios
      .get("http://localhost:5000/api/NCC") // Assuming this endpoint fetches all NCC
      .then((res) => setNCCs(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />


      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Thêm danh mục</h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          {/* Tên danh mục */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="categoryName"
            >
              Tên danh mục
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Nhập tên danh mục"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
            />
          </div>

          {/* Chọn nhà cung cấp */}
          <div className="mb-4">
            <label
              htmlFor="NCCId"
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
            >
              Nhà cung cấp
            </label>
            <select
              id="NCCId"
              name="NCCId"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
              placeholder="Chọn nhà cung cấp"
            >
              <option value="">Chọn nhà cung cấp</option>
              {NCCs.map((NCC) => (
                <option
                  className="text-slate-950"
                  key={NCC._id}
                  value={NCC._id}
                >
                  {NCC.NCC_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#ffd040] text-white font-bold py-2 px-4 rounded hover:bg-[#e6b800] focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
          >
            Thêm danh mục
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddCategory;
