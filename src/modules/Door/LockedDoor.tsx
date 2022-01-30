import { useEffect, useState } from "react";
import Controls from "@/components/Controls";
import ExampleLayout from "@/components/ExampleLayout";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import Door from "./components/Door";

const timeToOpen = 2000;

export default function LockedDoor() {
  const [locked, setLocked] = useState(true);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    let cleanup = false;
    let closeTimeoutId: number;
    let lockedTimeoutId: number;
    if (locked) {
      setOpen(false);
    } else {
      closeTimeoutId = setTimeout(() => {
        if (!cleanup) {
          setOpen(false);
          setClose(true);
          lockedTimeoutId = setTimeout(() => {
            if (!cleanup) {
              setClose(false);
              setLocked(true);
            }
          }, timeToOpen);
        }
      }, timeToOpen);
    }
    return () => {
      cleanup = true;
      clearTimeout(closeTimeoutId);
      clearTimeout(lockedTimeoutId);
    };
  }, [open]);

  return (
    <div>
      <h3>React</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/Door/LockedDoor.tsx" />
      </Links>
      <ExampleLayout>
        <Door timeToOpen={timeToOpen} opening={!!open} />
        <Controls>
          <button disabled={locked} onClick={() => setOpen(true)}>
            Open
          </button>
          <button disabled={!!open || close} onClick={() => setLocked(false)}>
            Unlock
          </button>
        </Controls>
      </ExampleLayout>
    </div>
  );
}
