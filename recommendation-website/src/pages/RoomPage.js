import React from "react";
import { useNavigate } from "react-router-dom";
import joinIcon from "../assets/images/JoinRoomIconV3.png";
import createIcon from "../assets/images/CreateRoomIconV3.png";
import smallIcon from "../assets/images/cowatch_small_icon.png";
import "./RoomPage.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const RoomPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/room");
  };

  const handleJoinClick = () => {
    navigate("/join-room");
  };

  const handleCreateClick = () => {
    navigate("/create-room");
  };

  return (
    <div className="room-page">
      <div className="header">
        <div className="logo">
          <img src={smallIcon} alt="logo" onClick={handleIconClick} />
        </div>
        <div className="guest-info">You are signed in as {user.name}</div>
      </div>
      <div className="options">
        <div className="option">
          <div className="icon">
            <img src={joinIcon} alt="Join Room" />
          </div>
          <button className="button" onClick={handleJoinClick}>
            Join Room
          </button>
        </div>
        <div className="option">
          <div className="icon">
            <img src={createIcon} alt="Create Room" />
          </div>
          <button className="button" onClick={handleCreateClick}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
