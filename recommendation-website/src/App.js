import logo from "./logo.svg";
import "./App.css";
import GoogleButton from "react-google-button";

function App() {
  return (
    <div className="App">
      <h1>Cowatch Recommendation</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GoogleButton
          onClick={() => {
            console.log("Google button clicked");
          }}
        />
      </div>
    </div>
  );
}

export default App;
