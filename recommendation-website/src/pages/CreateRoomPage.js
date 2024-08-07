import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/back_icon.png";
import "./CreateRoomPage.css"; // Import the CSS file
import { useContext } from "react";
import { UserContext } from "../UserContext";

const CreateRoom = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/room");
  };

  const handleRoomClick = () => {
    navigate("/panel");
  };

  return (
    <div className="create-room">
      <img
        src={backIcon}
        alt="Back"
        height={80}
        width={80}
        className="absolute left-12 top-12 cursor-pointer"
        onClick={handleIconClick}
      />
      <div className="content">
        <h1 className="absolute top-24 ml-20 text-xl font-bold">Settings:</h1>
        <div className="settings">
          <label>
            <input type="checkbox" />
            Anyone can add videos
          </label>
          <label>
            <input type="checkbox" />
            Anyone can suggest videos
          </label>
        </div>
        <button
          onClick={handleRoomClick}
          className="bg-gray-500 hover:bg-gray-700 duration-200 mt-5"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
