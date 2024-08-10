import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/back_icon.png";
import "./JoinRoomPage.css";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import URL from "../global";

//JoinRoom Page
const JoinRoomPage = () => {
  const { user } = useContext(UserContext);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  // Handler for IconClick
  const handleIconClick = () => {
    navigate("/room");
  };

  // Handler for RoomClick
  const handleRoomClick = async () => {
    const payload = { googleId: user.sub, roomCode };
    console.log("payload", payload);
    try {
      const response = await axios.post(`${URL}/join-room`, payload);
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
    }
    navigate("/panel");
  };

  // Return Page
  return (
    <div className="enter-room">
      <img
        src={backIcon}
        alt="Back"
        height={80}
        width={80}
        className="absolute left-12 top-12 cursor-pointer"
        onClick={handleIconClick}
      />
      <div className="content">
        <h1>ENTER ROOM CODE:</h1>
        <input
          type="text"
          value={roomCode}
          placeholder="INSERT 5 DIGIT CODE"
          maxLength="5"
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          onClick={handleRoomClick}
          className="bg-gray-500 hover:bg-gray-700 duration-200 mt-5"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
