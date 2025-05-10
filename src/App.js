import Navbar from "./nav/Navbar";
//import ThirdFrame from "./pages/ThirdFrame";
import TestThirdFrame from "./pages/TestThirdFrame";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventPage from "./pages/EventPage";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/third-page" element={<TestThirdFrame/>} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;