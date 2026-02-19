import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import DigitalTwinPage from "@/react-app/pages/DigitalTwin";
import AnalyticsPage from "@/react-app/pages/Analytics";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/digital-twin" element={<DigitalTwinPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}
