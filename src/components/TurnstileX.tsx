import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

const turnstileMachine = createMachine({
  id: "turnstile",
  initial: "locked",
  states: {
    locked: {
      on: {
        PUSH: "locked",
        COIN: "unlocked",
      },
    },
    unlocked: {
      on: {
        PUSH: "rotating",
        COIN: "unlocked",
      },
    },
    rotating: {
      after: {
        1000: { target: "locked" },
      },
    },
  },
});

export default function TurnstileX() {
  const [state, send] = useMachine(turnstileMachine);

  let turnstileState = "";
  if (state.value === "rotating") {
    turnstileState = "Rotating";
  } else {
    turnstileState = state.value === "locked" ? "Locked" : "Unlocked";
  }

  return (
    <>
      <h2>TurnstileX</h2>
      <p>Turnstile is {turnstileState}</p>
      <button onClick={() => send("PUSH")}>Push</button>
      <button onClick={() => send("COIN")}>Coin</button>
    </>
  );
}
