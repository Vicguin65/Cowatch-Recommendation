import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PanelPage from "./pages/PanelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/panel" element={<PanelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
