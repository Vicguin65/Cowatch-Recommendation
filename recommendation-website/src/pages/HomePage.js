import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/CoWatchLogoInWhite.png";
import "./HomePage.css";
import { UserContext } from "../UserContext";
import URL from "../global";

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

  const handleSuccessSignIn = async (credentialResponse) => {
    
    const { credential } = credentialResponse;
    // Send the token to your backend for verification and saving
    const res = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: credential }),
    });

    setUser({ name: decoded.name, sub: decoded.sub });
    navigate("/room");
  };

  const handleDemo = () => {
    navigate("/demo");
  };

  return (
    <div className="container">
      {/* <div className="logo"> */}
      <img src={logo} height={140} width={450} alt="CoWatch Logo" />
      {/* </div> */}

      <div className="buttons">
        <button
          className="bg-gray-500 hover:bg-gray-700 duration-200"
          onClick={handleGuestClick}
        >
          Join as Guest
        </button>

        <GoogleLogin
          onSuccess={(credentialResponse) =>
            handleSuccessSignIn(credentialResponse)
          }
          onError={() => {
            console.log("Login Failed");
          }}
          scopes = {[
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
          ]}
        />

        {/* <button onClick={handleDemo}>Two People demo</button> */}
      </div>
    </div>
  );
};

export default HomePage;
