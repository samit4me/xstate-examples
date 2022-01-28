import { useState } from "react";

export default function TwoSwitchLight() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [brokenBulb, setBrokenBulb] = useState(false);

  const reset = () => {
    setSwitch1(false);
    setSwitch2(false);
    setBrokenBulb(false);
  };

  let lightStatus = "Broken";
  if (!brokenBulb) {
    lightStatus = switch1 !== switch2 ? "On" : "Off";
  }

  return (
    <div>
      <h2>Two Switch Light</h2>
      <p>Light is {lightStatus}</p>
      <label>
        <input
          type="checkbox"
          checked={switch1}
          onChange={() => setSwitch1(!switch1)}
        />{" "}
        Switch 1
      </label>
      <label>
        <input
          type="checkbox"
          checked={switch2}
          onChange={() => setSwitch2(!switch2)}
        />{" "}
        Switch 2
      </label>
      <div>
        <button onClick={() => setBrokenBulb(true)}>Break bulb</button>
        <button onClick={() => setBrokenBulb(false)}>Replace bulb</button>
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  );
}
