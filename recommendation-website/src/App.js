import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PanelPage from "./pages/PanelPage";
import RoomPage from "./pages/RoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import PlayerPage from "./pages/PlayerPage";

function App() {
  return (
    // Create Router for all pages
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
