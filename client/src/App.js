import './App.css';
// import Login from './Login/Login';
import Register from './Register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* <Route exact path="/login" element={<Login />} /> */}
        <Route exact path="/register" element={<Register />} />
      </Routes>
      </Router>    
    </>
  );
}

export default App;
