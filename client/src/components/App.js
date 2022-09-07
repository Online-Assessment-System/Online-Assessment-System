import '../styles/App.css';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>    
    </>
  );
}

export default App;
