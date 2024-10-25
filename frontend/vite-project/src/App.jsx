import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Login/Register';
import Login from './Login/Login';
import Home from './Login/home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dk" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
