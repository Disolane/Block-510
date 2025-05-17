import Navbar from "./nav/Navbar";
import TestFloor from './pages/TestFloor';

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
          <Route path="/building/:buildingId" element={<TestThirdFrame />} />
          <Route path="/floor/:floorId" element={<TestFloor />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;