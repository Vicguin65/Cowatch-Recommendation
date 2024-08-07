import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import joinIcon from "../assets/images/JoinRoomIconV3.png";
import createIcon from "../assets/images/CreateRoomIconV3.png";
import smallIcon from "../assets/images/cowatch_small_icon.png";
import "./RoomPage.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import backIcon from "../assets/images/back_icon.png";

const RoomPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/");
  };

  const handleJoinClick = () => {
    navigate("/join-room");
  };

  const handleCreateClick = () => {
    navigate("/create-room");
  };

  return (
    <div className="room-page">
      <img
        src={backIcon}
        alt="Back"
        height={80}
        width={80}
        className="absolute left-12 top-12 cursor-pointer"
        onClick={handleIconClick}
      />
      <div className="text-2xl font-bold">You are signed in as {user.name}</div>
      <div className="options">
        <div className="option">
          <div className="icon">
            <img src={joinIcon} alt="Join Room" />
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 duration-200 mt-5"
            onClick={handleJoinClick}
          >
            Join Room
          </button>
        </div>
        <div className="option">
          <div className="icon">
            <img src={createIcon} alt="Create Room" />
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 duration-200 mt-5"
            onClick={handleCreateClick}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
