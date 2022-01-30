import { useState } from "react";
import GitHubLink from "@/components/GitHubLink";
import Links from "@/components/Links";
import LightBulb from "./components/LightBulb";
import LightControls from "./components/LightControls";
import LightLayout from "./components/LightLayout";
import LightSwitch from "./components/LightSwitch";

const isOn = (switches: boolean[]) => switches.filter(sw => sw).length % 2 === 0;

export default function TripleSwitch() {
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);
  const [broken, setBroken] = useState(false);

  const on = isOn([switch1, switch2, switch3]);

  const reset = () => {
    setSwitch1(true);
    setSwitch2(false);
    setSwitch3(false);
    setBroken(false);
  };

  return (
    <div>
      <h3>React</h3>
      <Links>
        <GitHubLink href="https://github.com/samit4me/xstate-examples/blob/main/src/modules/LightCircuit/TripleSwitch.tsx" />
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
        <LightSwitch checked={switch3} onChange={() => setSwitch3(!switch3)} />
      </LightLayout>
    </div>
  );
}
