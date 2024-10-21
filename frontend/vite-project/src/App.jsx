import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Login/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        {/* Các route khác */}
      </Routes>
    </Router>
  );
}

export default App;
