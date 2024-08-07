import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/back_icon.png";
import "./JoinRoomPage.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const JoinRoomPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/room");
  };

  const handleRoomClick = () => {
    navigate("/panel");
  };

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
        <input type="text" placeholder="INSERT 5 DIGIT CODE" maxLength="5" />
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
