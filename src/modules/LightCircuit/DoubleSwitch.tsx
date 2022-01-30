import { useState } from "react";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import LightBulb from "./components/LightBulb";
import LightControls from "./components/LightControls";
import LightLayout from "./components/LightLayout";
import LightSwitch from "./components/LightSwitch";

export default function DoubleSwitch() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [broken, setBroken] = useState(false);

  const on = switch1 !== switch2;

  const reset = () => {
    setSwitch1(false);
    setSwitch2(false);
    setBroken(false);
  };

  return (
    <div>
      <h3>React</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/LightCircuit/DoubleSwitch.tsx" />
      </Links>
      <LightLayout>
        <LightControls>
          <button onClick={() => setBroken(true)}>Break</button>
          <button onClick={() => setBroken(false)}>Fix</button>
          <button onClick={reset}>RESET</button>
        </LightControls>
        <LightBulb broken={broken} on={on} />
        <LightSwitch checked={switch1} onChange={() => setSwitch1(!switch1)} />
        <LightSwitch checked={switch2} onChange={() => setSwitch2(!switch2)} />
      </LightLayout>
    </div>
  );
}
