import logo from "./logo.svg";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";


function App() {
  const [jsonResponse, setJsonResponse] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Google login integration</p>
        <span>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const decoded = jwtDecode(credentialResponse?.credential);
              setJsonResponse(decoded);
              
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          {jsonResponse && <pre>{"You are signed in as," + JSON.stringify(jsonResponse, null, 2)}</pre>
            // jsonResponse && <pre>{"You are signed in as," + JSON.stringify(jsonResponse.name, null, 2)}</pre>
          }
        </span>
      </header>
    </div>
  );
}

export default App;
