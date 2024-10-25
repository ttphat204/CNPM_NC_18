import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";
import Home from "./Login/home";
import Dashboard from "./pages/Dashboard";
import ListUser from './pages/ListUser';
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import AddCategory from "./pages/AddCategory";
import ListCategory from './pages/ListCategory';
import AddNCC from "./pages/AddNCC";
import ListNCC from './pages/ListNCC';
import ViewOrder from './pages/ViewOrder';
import ListOrder from './pages/ListOrder';
import AddDiscount from './pages/AddDiscount';
import ListDiscount from './pages/ListDiscount';
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
          <Route path='/ListUser' element={<ListUser />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path='/ListProduct' element={<ListProduct />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path='/ListCategory' element={<ListCategory />} />
          <Route path="/AddNCC" element={<AddNCC />} />
          <Route path='/ListNCC' element={<ListNCC />} />
          <Route path='/ViewOrder' element={<ViewOrder />} />
          <Route path='/ListOrder' element={<ListOrder />} />
          <Route path='/AddDiscount' element={<AddDiscount />} />
          <Route path='/ListDiscount' element={<ListDiscount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
