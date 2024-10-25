import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AddNCC from "./pages/AddNCC";
import ListNCC from './pages/ListNCC';
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
          <Route path='/ListNCC' element={<ListNCC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
