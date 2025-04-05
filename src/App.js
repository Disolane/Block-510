import Navbar from "./nav/Navbar";
import Home from "./pages/Home";
import SecondFrame from "./pages/SecondFrame";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/second-page" element={<SecondFrame />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;