import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import EntryPage from "./pages/EntryPage";
import PhotoBooth from "./pages/PhotoBooth";
import StyleEditor from "./pages/StyleEditor";
import CalendarComponent from "./pages/CalendarComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/entry/:id" element={<EntryPage />} />
        <Route path="/photo" element={<PhotoBooth />} />
        <Route path="/photo/new" element={<StyleEditor mode="new" />} />
        <Route path="/photo/:id" element={<StyleEditor mode="edit" />} />
        <Route path="/calendar" element={<CalendarComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
