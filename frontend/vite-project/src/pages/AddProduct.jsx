import { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const AddProduct = () => {

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
        </form>a
      </main>
    </div>
  );
};

export default AddProduct;
