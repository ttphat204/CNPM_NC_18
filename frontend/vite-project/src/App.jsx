import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";
import Home from "./UI/home";
import Dashboard from "./pages/Dashboard";
import ListUser from "./pages/ListUser";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import AddCategory from "./pages/AddCategory";
import ListCategory from "./pages/ListCategory";
import AddNCC from "./pages/AddNCC";
import ListNCC from "./pages/ListNCC";
import ViewOrder from "./pages/ViewOrder";
import ListOrder from "./pages/ListOrder";
import AddDiscount from "./pages/AddDiscount";
import ListDiscount from "./pages/ListDiscount";
// import DetailProduct from "./UI/detail_product";
// import ShoppingCart from "./UI/cart";
import CreatePromotion from "./pages/CreatePromotion";
import Kho from "./pages/Kho";
import Order_inf from "./UI/order_inf";
import CategoryPage from "./UI/Category_page";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Các route liên quan đến đăng ký, đăng nhập và trang chủ */}
          <Route path="/dk" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Các route liên quan đến dashboard và quản lý */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/ListUser" element={<ListUser />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ListProduct" element={<ListProduct />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/ListCategory" element={<ListCategory />} />
          <Route path="/AddNCC" element={<AddNCC />} />
          <Route path="/ListNCC" element={<ListNCC />} />
          <Route path="/ViewOrder" element={<ViewOrder />} />
          <Route path="/ListOrder" element={<ListOrder />} />
          <Route path="/AddDiscount" element={<AddDiscount />} />
          <Route path="/KhuyenMai" element={<CreatePromotion />} />
          <Route path="/ListDiscount" element={<ListDiscount />} />
          <Route path="/Kho" element={<Kho />} />
          {/* Các route liên quan đến giao diện người dùng */}
          {/* <Route path="/product/:id" element={<DetailProduct />} /> */}
          {/* <Route path="/Cart" element={<ShoppingCart />} /> */}
          <Route path="/Order_inf" element={<Order_inf />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
