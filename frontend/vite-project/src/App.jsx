import "./App.css";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import AddNCC from "./components/AddNCC";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/AddNCC" element={<AddNCC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
