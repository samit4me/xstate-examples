import { useMachine } from "@xstate/react";
import { assign, createMachine } from "xstate";
import Controls from "@/components/Controls";
import ExampleLayout from "@/components/ExampleLayout";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import StatelyVizLink from "@/components/StatelyVizLink";
import LightBulb from "./components/LightBulb";
import LightSwitch from "./components/LightSwitch";

interface Context {
  switch1: boolean;
  switch2: boolean;
}

const context = { switch1: false, switch2: false };
const isClosed = ({ switch1, switch2 }: Context) => switch1 !== switch2;
const isOpen = (context: Context) => !isClosed(context);

const lightMachine = createMachine<Context>(
  {
    id: "light",
    initial: "lightOff",
    context,
    states: {
      lightOff: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1", target: "lightOn" },
          FLIP_SWITCH2: { actions: "flipSwitch2", target: "lightOn" },
          BREAK: "broken",
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
      lightOn: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1", target: "lightOff" },
          FLIP_SWITCH2: { actions: "flipSwitch2", target: "lightOff" },
          BREAK: "broken",
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
      broken: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1" },
          FLIP_SWITCH2: { actions: "flipSwitch2" },
          FIX: [
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
      flipSwitch1: assign({ switch1: ({ switch1 }) => !switch1 }),
      flipSwitch2: assign({ switch2: ({ switch2 }) => !switch2 }),
      reset: assign(context),
    },
    guards: {
      isClosed,
      isOpen,
    },
  }
);

export default function DoubleSwitchXState() {
  const [state, send] = useMachine(lightMachine);

  const { context, value } = state;
  const { switch1, switch2 } = context;

  return (
    <div>
      <h3>React with XState</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/LightCircuit/DoubleSwitchXState.tsx" />
        <StatelyVizLink href="https://stately.ai/viz/e481f752-87aa-416e-b0d5-2a855c3db341" />
      </Links>
      <ExampleLayout>
        <Controls>
          <button onClick={() => send("BREAK")}>Break</button>
          <button onClick={() => send("FIX")}>Fix</button>
          <button onClick={() => send("RESET")}>RESET</button>
        </Controls>
        <LightBulb broken={value === "broken"} on={value === "lightOn"} />
        <LightSwitch checked={switch1} onChange={() => send("FLIP_SWITCH1")} />
        <LightSwitch checked={switch2} onChange={() => send("FLIP_SWITCH2")} />
      </ExampleLayout>
    </div>
  );
}
