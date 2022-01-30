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
  switch3: boolean;
}

const context = { switch1: true, switch2: false, switch3: false };
const isOn = (switches: boolean[]) => switches.filter(sw => sw).length % 2 === 0;
const isClosed = ({ switch1, switch2, switch3 }: Context) => isOn([switch1, switch2, switch3]);
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
      flipSwitch3: assign({ switch3: ({ switch3 }) => !switch3 }),
      reset: assign(context),
    },
    guards: {
      isClosed,
      isOpen,
    },
  }
);

export default function TripleSwitchXState() {
  const [state, send] = useMachine(lightMachine);

  const { context, value } = state;
  const { switch1, switch2, switch3 } = context;

  return (
    <div>
      <h3>React with XState</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/LightCircuit/TripleSwitchXState.tsx" />
        <StatelyVizLink href="https://stately.ai/viz/589115c4-f189-4d28-ac33-27c1d7d513ef" />
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
        <LightSwitch checked={switch3} onChange={() => send("FLIP_SWITCH3")} />
      </ExampleLayout>
    </div>
  );
}
