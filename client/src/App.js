import './App.css';
// import Login from './Login/Login';
import Signup from './SignUp/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* <Route exact path="/login" element={<Login />} /> */}
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      </Router>    
    </>
  );
}

export default App;
