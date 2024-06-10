import "./App.css";
import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function App() {
  const backgroundImageUrl =
    "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const [jsonResponse, setJsonResponse] = useState(null);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="items-center flex flex-col bg-cover bg-center bg-no-repeat h-screen w-screen p-5"
    >
      <h1 className="text-5xl text-white font-bold mt-14">
        Welcome to Cowatch!
      </h1>
      <h3 className="mt-5 text-2xl text-white font-light italic">
        "Stream Together, Bond Forever"
      </h3>
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="py-8 px-12 flex flex-col justify-center items-center bg-slate-900 rounded-3xl shadow">
          <h3 className="text-xl text-white mb-5">
            Connect Your Google Account
          </h3>
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
          {/* {
            jsonResponse && (
              <pre>
                {"You are signed in as," +
                  JSON.stringify(jsonResponse, null, 2)}
              </pre>
            )
            // jsonResponse && <pre>{"You are signed in as," + JSON.stringify(jsonResponse.name, null, 2)}</pre>
          } */}
        </div>
      </div>
    </div>
  );
}

export default App;
