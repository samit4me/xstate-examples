import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Light from "./components/Light";
import LightX from "./components/LightX";
import Turnstile from "./components/Turnstile";
import TurnstileX from "./components/TurnstileX";
import TwoSwitchLight from "./components/TwoSwitchLight";
import TwoSwitchLightX from "./components/TwoSwitchLightX";
import ThreeSwitchLightX from "./components/ThreeSwitchLightX";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: "50%", maxWidth: "1000px" }}>
          <Light />
          <LightX />
        </div>
        <div style={{ width: "50%", maxWidth: "1000px" }}>
          <Turnstile />
          <TurnstileX />
        </div>
        <div style={{ width: "50%", maxWidth: "1000px" }}>
          <TwoSwitchLight />
          <TwoSwitchLightX />
          <ThreeSwitchLightX />
        </div>
      </header>
    </div>
  );
}

export default App;
