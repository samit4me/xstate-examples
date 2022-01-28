import { useMachine } from "@xstate/react";
import { assign, createMachine, EventObject } from "xstate";

interface Context {
  switch1: number;
  switch2: number;
  switch3: number;
}

const context = { switch1: 1, switch2: 0, switch3: 0 }

const flipSwitch = (sw: number) => (sw === 0 ? 1 : 0);
function isClosed({ switch1, switch2, switch3 }: Context) {
  const total = switch1 + switch2 + switch3;
  return total === 0 || total === 2;
}
const isOpen = (context: Context) => !isClosed(context);

const threeSwitchCircuitMachine = createMachine<Context>(
  {
    id: "threeSwitchCircuit",
    initial: "lightOff",
    context,
    states: {
      lightOff: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1", target: "lightOn" },
          FLIP_SWITCH2: { actions: "flipSwitch2", target: "lightOn" },
          FLIP_SWITCH3: { actions: "flipSwitch3", target: "lightOn" },
          BREAK: "broken",
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
      lightOn: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1", target: "lightOff" },
          FLIP_SWITCH2: { actions: "flipSwitch2", target: "lightOff" },
          FLIP_SWITCH3: { actions: "flipSwitch3", target: "lightOff" },
          BREAK: "broken",
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
      broken: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1" },
          FLIP_SWITCH2: { actions: "flipSwitch2" },
          FLIP_SWITCH3: { actions: "flipSwitch3" },
          REPLACE: [
            { cond: "isClosed", target: "lightOn" },
            { target: "lightOff" },
          ],
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
    },
  },
  {
    actions: {
      flipSwitch1: assign({ switch1: ({ switch1 }) => flipSwitch(switch1) }),
      flipSwitch2: assign({ switch2: ({ switch2 }) => flipSwitch(switch2) }),
      flipSwitch3: assign({ switch3: ({ switch3 }) => flipSwitch(switch3) }),
      reset: assign(context),
    },
    guards: {
      isClosed,
      isOpen,
    },
  }
);

export default function ThreeSwitchLightX() {
  const [state, send] = useMachine<Context, EventObject>(
    threeSwitchCircuitMachine
  );

  const { switch1, switch2, switch3 } = state.context;

  let lightStatus = "Broken";
  if (state.value !== "broken") {
    lightStatus = state.value === "lightOn" ? "On" : "Off";
  }

  return (
    <div>
      <h2>Three Switch Light X</h2>
      <p>Light is {lightStatus}</p>
      <label>
        <input
          type="checkbox"
          checked={!!switch1}
          onChange={() => send("FLIP_SWITCH1")}
        />{" "}
        Switch 1
      </label>
      <label>
        <input
          type="checkbox"
          checked={!!switch2}
          onChange={() => send("FLIP_SWITCH2")}
        />{" "}
        Switch 2
      </label>
      <label>
        <input
          type="checkbox"
          checked={!!switch3}
          onChange={() => send("FLIP_SWITCH3")}
        />{" "}
        Switch 3
      </label>
      <div>
        <button onClick={() => send("BREAK")}>Break bulb</button>
        <button onClick={() => send("REPLACE")}>Replace bulb</button>
        <button onClick={() => send("RESET")}>RESET</button>
      </div>
    </div>
  );
}
