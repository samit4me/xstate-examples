import { useState } from "react";
import Controls from "@/components/Controls";
import ExampleLayout from "@/components/ExampleLayout";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import LightBulb from "./components/LightBulb";
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
      <ExampleLayout>
        <Controls>
          <button onClick={() => setBroken(true)}>Break</button>
          <button onClick={() => setBroken(false)}>Fix</button>
          <button onClick={reset}>RESET</button>
        </Controls>
        <LightBulb broken={broken} on={on} />
        <LightSwitch checked={on} onChange={() => setOn(!on)} />
      </ExampleLayout>
    </div>
  );
}
