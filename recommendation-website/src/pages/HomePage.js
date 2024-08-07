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
    // console.log("here it is");
    // console.log(credentialResponse);
    // const decoded = jwtDecode(credentialResponse?.credential);
    // setJsonResponse(decoded);
    // //TODO:
    // // Implement google logout
    // if (decoded) {
    //   setUser({ name: decoded.name });
    // } else {
    //   console.log("SIGN IN FAILED");
    //   setUser({ name: "Guest" });
    // }
    const userData = {
      token: credentialResponse.credential,
    };

    console.log(userData.token);

    // Send user data to server
    fetch("http://localhost:5000/api/users/oauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User saved:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setUser({ name: "Help" });
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
        />

        {/* <button onClick={handleDemo}>Two People demo</button> */}
      </div>
    </div>
  );
};

export default HomePage;
