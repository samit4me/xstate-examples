import { useState } from "react";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import LightBulb from "./components/LightBulb";
import LightControls from "./components/LightControls";
import LightLayout from "./components/LightLayout";
import LightSwitch from "./components/LightSwitch";

export default function SingleSwitch() {
  const [on, setOn] = useState(false);
  const [broken, setBroken] = useState(false);

  const reset = () => {
    setOn(false);
    setBroken(false);
  };

  return (
    <div>
      <h3>React</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/LightCircuit/SingleSwitch.tsx" />
      </Links>
      <LightLayout>
        <LightControls>
          <button onClick={() => setBroken(true)}>Break</button>
          <button onClick={() => setBroken(false)}>Fix</button>
          <button onClick={reset}>RESET</button>
        </LightControls>
        <LightBulb broken={broken} on={on} />
        <LightSwitch checked={on} onChange={() => setOn(!on)} />
      </LightLayout>
    </div>
  );
}
