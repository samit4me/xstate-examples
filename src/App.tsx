import { useState } from "react";
import "./App.css";
import LockedDoor from "@/modules/Door/LockedDoor";
import LockedDoorXState from "@/modules/Door/LockedDoorXState";
import DoubleSwitch from "@/modules/LightCircuit/DoubleSwitch";
import DoubleSwitchXState from "@/modules/LightCircuit/DoubleSwitchXState";
import SingleSwitch from "@/modules/LightCircuit/SingleSwitch";
import SingleSwitchXState from "@/modules/LightCircuit/SingleSwitchXState";
import TripleSwitch from "@/modules/LightCircuit/TripleSwitch";
import TripleSwitchXState from "@/modules/LightCircuit/TripleSwitchXState";
import ExampleCard from "./components/ExampleCard";
import Turnstile from "./components/Turnstile";
import TurnstileX from "./components/TurnstileX";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>XState examples</h1>
      <ExampleCard>
        <LockedDoor />
        <LockedDoorXState />
      </ExampleCard>
      <ExampleCard>
          <SingleSwitch />
          <SingleSwitchXState />
      </ExampleCard>
      <ExampleCard>
          <DoubleSwitch />
          <DoubleSwitchXState />
      </ExampleCard>
      <ExampleCard>
          <TripleSwitch />
          <TripleSwitchXState />
      </ExampleCard>
      {/* <div className="card">
          <Turnstile />
          <TurnstileX />
        </div> */}
    </div>
  );
}
