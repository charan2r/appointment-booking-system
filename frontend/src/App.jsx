import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AppointmentList from "./components/AppointmentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
}

export default App;
