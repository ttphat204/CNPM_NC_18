import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";
import Home from "./Login/home";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AddNCC from "./pages/AddNCC";
import ListNCC from "./pages/ListNCC";

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
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/AddNCC" element={<AddNCC />} />
          <Route path='/ListNCC' element={<ListNCC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
