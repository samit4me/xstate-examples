import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

const lightMachine = createMachine({
  id: "light",
  initial: "lightOff",
  states: {
    lightOff: {
      on: {
        ON: "lightOn",
        BREAK: "broken",
      },
    },
    lightOn: {
      on: {
        OFF: "lightOff",
        BREAK: "broken",
      },
    },
    broken: {},
  },
});

export default function LightX() {
  const [current, send] = useMachine(lightMachine);

  let lightState = "";
  if (current.matches("broken")) {
    lightState = "Broken";
  } else {
    lightState = current.matches("lightOn") ? "On" : "Off";
  }

  return (
    <>
      <h2>Light xstate</h2>
      <p>The lightbulb is {lightState}</p>
      <button onClick={() => send("ON")}>Turn on</button>
      <button onClick={() => send("OFF")}>Turn off</button>
      <button onClick={() => send("BREAK")}>Break</button>
    </>
  );
}
