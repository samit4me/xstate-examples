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
}

const context = { switch1: false };
const isClosed = ({ switch1 }: Context) => switch1;
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
          BREAK: "broken",
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
      lightOn: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1", target: "lightOff" },
          BREAK: "broken",
          RESET: { actions: "reset", target: "lightOff" },
        },
      },
      broken: {
        on: {
          FLIP_SWITCH1: { actions: "flipSwitch1" },
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
      reset: assign(context),
    },
    guards: {
      isClosed,
      isOpen,
    },
  }
);

export default function SingleSwitchXState() {
  const [state, send] = useMachine(lightMachine);

  const { context, value } = state;
  const { switch1 } = context;

  return (
    <div>
      <h3>React with XState</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/LightCircuit/SingleSwitchXState.tsx" />
        <StatelyVizLink href="https://stately.ai/viz/aba2b039-2665-4beb-865a-a48e96c6e044" />
      </Links>
      <ExampleLayout>
        <Controls>
          <button onClick={() => send("BREAK")}>Break</button>
          <button onClick={() => send("FIX")}>Fix</button>
          <button onClick={() => send("RESET")}>RESET</button>
        </Controls>
        <LightBulb broken={value === "broken"} on={value === "lightOn"} />
        <LightSwitch checked={switch1} onChange={() => send("FLIP_SWITCH1")} />
      </ExampleLayout>
    </div>
  );
}
