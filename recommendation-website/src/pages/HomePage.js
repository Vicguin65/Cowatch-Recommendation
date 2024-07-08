import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/CoWatchLogoInWhite.png";
import "./HomePage.css";
import { UserContext } from "../UserContext";

const HomePage = () => {
  const backgroundImageUrl =
    "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const [jsonResponse, setJsonResponse] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleGuestClick = () => {
    setUser({ name: "Guest" });
    navigate("/room");
  };

  const handleSuccessSignIn = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    setJsonResponse(decoded);
    //TODO:
    // Implement google logout
    if (jsonResponse) setUser({ name: jsonResponse.name });
    navigate("/room");
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="CoWatch Logo" />
      </div>

      <div className="buttons">
        <button className="guest-button" onClick={handleGuestClick}>
          Join as Guest
        </button>

        <GoogleLogin
          onSuccess={(credentialResponse) =>
            handleSuccessSignIn(credentialResponse)
          }
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
