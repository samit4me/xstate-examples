import { useEffect, useState } from "react";

export default function Turnstile() {
  const [locked, setLocked] = useState(true);
  const [pushing, setPushing] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    if (locked) {
      setPushing(false);
    } else {
      timeoutId = setTimeout(() => {
        setPushing(false);
        setLocked(true);
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [pushing]);

  let turnstileState = "";
  if (pushing) {
    turnstileState = "Rotating";
  } else {
    turnstileState = locked ? "Locked" : "Unlocked";
  }

  return (
    <>
      <h2>Turnstile</h2>
      <p>Turnstile is {turnstileState}</p>
      <button onClick={() => setPushing(true)}>Push</button>
      <button onClick={() => setLocked(false)}>Coin</button>
    </>
  );
}
