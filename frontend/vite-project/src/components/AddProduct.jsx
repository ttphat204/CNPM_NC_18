import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

const AddProduct = () => {
  const [showUserMenu, setShowUserMenu] = useState(false); // Trạng thái cho menu người dùng
  const [showProductMenu, setShowProductMenu] = useState(false); // Trạng thái cho menu quản lý sản phẩm
  const [showOrderMenu, setShowOrderMenu] = useState(false); // Trạng thái cho menu quản lý đơn hàng
  const [showNCCMenu, setShowNCCMenu] = useState(false);
  const [showDiscount, setDiscoiunt] = useState(false);
  const [showCategory, setCategory] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories created by admin
    axios
      .get("http://localhost:5000/api/categories") // Assuming this endpoint fetches all categories
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-[#ffd040] text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Menu Admin</h2>
        <ul>
          <li className="mb-2">
            <Link to="/" className="flex items-center hover:text-gray-300">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center hover:text-gray-300 w-full text-left"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Quản lý người dùng
              <ChevronDownIcon
                className={`w-5 h-5 ml-auto transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showUserMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Danh sách người dùng
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button
              onClick={() => setShowProductMenu(!showProductMenu)}
              className="flex items-center hover:text-gray-300 w-full text-left"
            >
              <CubeIcon className="w-5 h-5 mr-2" />
              Quản lý sản phẩm
              <ChevronDownIcon
                className={`w-5 h-5 ml-auto transition-transform ${
                  showProductMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showProductMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <Link to="/AddProduct" className="hover:text-gray-300">
                    Thêm sản phẩm
                  </Link>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Danh sách sản phẩm
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button
              onClick={() => setShowOrderMenu(!showOrderMenu)}
              className="flex items-center hover:text-gray-300 w-full text-left"
            >
              <ClipboardCheckIcon className="w-5 h-5 mr-2" />
              Quản lý đơn hàng
              <ChevronDownIcon
                className={`w-5 h-5 ml-auto transition-transform ${
                  showOrderMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showOrderMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Danh sách đơn hàng
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Theo dõi đơn hàng
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button
              onClick={() => setShowNCCMenu(!showNCCMenu)}
              className="flex items-center hover:text-gray-300 w-full text-left"
            >
              <OfficeBuildingIcon className="w-5 h-5 mr-2" />
              Quản lý nhà cung cấp
              <ChevronDownIcon
                className={`w-5 h-5 ml-auto transition-transform ${
                  showNCCMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showNCCMenu && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <Link to="/AddNCC" className="hover:text-gray-300">
                    Thêm nhà cung cấp
                  </Link>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Danh sách nhà cung cấp
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button
              onClick={() => setDiscoiunt(!showDiscount)}
              className="flex items-center hover:text-gray-300 w-full text-left"
            >
              <TagIcon className="w-5 h-5 mr-2" />
              Quản lý khuyến mãi
              <ChevronDownIcon
                className={`w-5 h-5 ml-auto transition-transform ${
                  showDiscount ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDiscount && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Thêm khuyến mãi
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Danh sách khuyến mãi
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button
              onClick={() => setCategory(!showCategory)}
              className="flex items-center hover:text-gray-300 w-full text-left"
            >
              <CollectionIcon className="w-5 h-5 mr-2" />
              Quản lý danh mục
              <ChevronDownIcon
                className={`w-5 h-5 ml-auto transition-transform ${
                  showCategory ? "rotate-180" : ""
                }`}
              />
            </button>
            {showCategory && (
              <ul className="ml-4 mt-2">
                <li className="mb-1">
                  <Link to="/AddCategory" className="hover:text-gray-300">
                    Thêm danh mục
                  </Link>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-300">
                    Danh sách danh mục
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Thêm sản phẩm</h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="productName"
            >
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="productName"
              placeholder="Nhập tên sản phẩm"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
            />
          </div>

          {/* Giá */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="price"
            >
              Giá
            </label>
            <input
              type="number"
              id="price"
              placeholder="Nhập giá"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
            />
          </div>

          {/* Hình ảnh */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="img"
            >
              Hình ảnh
            </label>
            <input
              type="text"
              id="img"
              placeholder="Nhập đường dẫn hình ảnh"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
            />
          </div>

          {/* Mô tả sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="desProduct"
            >
              Mô tả sản phẩm
            </label>
            <textarea
              id="desProduct"
              placeholder="Nhập mô tả sản phẩm"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
              rows="4"
              maxLength={1000}
            ></textarea>
          </div>

          {/* Chọn danh mục sản phẩm */}
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
            >
              Danh mục
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
              placeholder="Chọn danh mục"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option
                  className="text-slate-950"
                  key={category._id}
                  value={category._id}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Giảm giá */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="discount"
            >
              Giảm giá (%)
            </label>
            <input
              type="number"
              id="discount"
              placeholder="Nhập phần trăm giảm giá"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
            />
          </div>

          {/* Giá mới */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="newPrice"
            >
              Giá sau khuyến mãi
            </label>
            <input
              type="number"
              id="newPrice"
              placeholder="Nhập giá sau khuyến mãi"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#ffd040] text-white font-bold py-2 px-4 rounded hover:bg-[#e6b800] focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
          >
            Thêm sản phẩm
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
