import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [jsonResponse, setJsonResponse] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>Google login integration</p>
          <span>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                const decoded = jwtDecode(credentialResponse?.credential);
                setJsonResponse(decoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            {
              jsonResponse && (
                <pre>
                  {"You are signed in as," +
                    JSON.stringify(jsonResponse, null, 2)}
                </pre>
              )
              // jsonResponse && <pre>{"You are signed in as," + JSON.stringify(jsonResponse.name, null, 2)}</pre>
            }
          </span>
        </div>
        <Link to="/panel">Panels</Link>
      </header>
    </div>
  );
};

export default HomePage;
