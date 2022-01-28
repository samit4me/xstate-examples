import { useState } from "react";

export default function Light() {
  const [on, setOn] = useState(false);
  const [broken, setBroken] = useState(false);

  let lightState = "";
  if (broken) {
    lightState = "Broken";
  } else {
    lightState = on ? "On" : "Off";
  }

  return (
    <>
      <h2>Light</h2>
      <p>The lightbulb is {lightState}</p>
      <button onClick={() => setOn(true)}>Turn on</button>
      <button onClick={() => setOn(false)}>Turn off</button>
      <button onClick={() => setBroken(true)}>Break</button>
    </>
  );
}
