import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import EntryPage from "./pages/EntryPage";
import PhotoBooth from "./pages/PhotoBooth";
import StyleEditor from "./pages/StyleEditor";
import CalendarComponent from "./pages/CalendarComponent";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import HelpCenter from "./pages/HelpCenter";
import HelpArticle from "./pages/HelpArticle";
import RequestFeature from "./pages/RequestFeature";
import PasswordAuth from "./pages/PasswordAuth";

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

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<EditProfile />} />
        <Route path="/settings/password" element={<PasswordAuth />} />

        <Route path="/help" element={<HelpCenter />} />
        <Route path="/help/:slug" element={<HelpArticle />} />
        <Route path="/request-feature" element={<RequestFeature />} />
      </Routes>
    </Router>
  );
}

export default App;
