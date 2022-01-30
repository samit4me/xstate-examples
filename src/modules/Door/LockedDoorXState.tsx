import { useMachine } from "@xstate/react";
import { createMachine, actions } from "xstate";
import Controls from "@/components/Controls";
import ExampleLayout from "@/components/ExampleLayout";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import StatelyVizLink from "@/components/StatelyVizLink";
import Door from "./components/Door";

const timeToOpen = 2000;

const { send, cancel } = actions;
const openTimer = send(
  { type: "CLOSE" },
  { delay: timeToOpen, id: "openTimer" }
);
const cancelOpenTimer = cancel("openTimer");
const closeTimer = send(
  { type: "LOCK" },
  { delay: timeToOpen, id: "closeTimer" }
);
const cancelCloseTimer = cancel("closeTimer");

const doorMachine = createMachine({
  id: "lockedDoor",
  initial: "locked",
  states: {
    locked: {
      on: {
        OPEN: "locked",
        UNLOCK: "unlocked",
      },
    },
    unlocked: {
      on: {
        OPEN: "open",
        LOCK: "locked",
      },
    },
    open: {
      entry: openTimer,
      on: {
        OPEN: "open",
        CLOSE: { target: "close" },
        CANCEL: { actions: cancelOpenTimer },
      },
    },
    close: {
      entry: closeTimer,
      on: {
        OPEN: "open",
        LOCK: { target: "locked" },
        CANCEL: { actions: cancelCloseTimer },
      },
    },
  },
});

export default function LockedDoorXState() {
  const [state, send] = useMachine(doorMachine);

  const { value } = state;
  const locked = value === "locked";
  const open = value === "open";
  const close = value === "close";

  return (
    <div>
      <h3>React with XState</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/Door/LockedDoorXState.tsx" />
        <StatelyVizLink href="https://stately.ai/viz/cf38439a-5689-41c6-9603-a80618d4d83c" />
      </Links>
      <ExampleLayout>
        <Door timeToOpen={timeToOpen} opening={open} />
        <Controls>
          <button disabled={locked} onClick={() => send(["CANCEL", "OPEN"])}>
            Open
          </button>
          <button disabled={open || close} onClick={() => send("UNLOCK")}>
            Unlock
          </button>
        </Controls>
      </ExampleLayout>
    </div>
  );
}
