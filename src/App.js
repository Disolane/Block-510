import Navbar from "./nav/Navbar";
import SecondFrame from "./pages/SecondFrame";
import ThirdFrame from "./pages/ThirdFrame";
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
          <Route path="/second-page" element={<SecondFrame />} /> 
          <Route path="/third-page" element={<ThirdFrame />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;