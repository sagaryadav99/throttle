import { useState, useEffect, useRef } from "react";
function useThrottle(fn, delay) {
  const now = useRef(Date.now());
  return function () {
    if (Date.now() - now.current < delay) {
      return;
    }
    fn();
    now.current = Date.now();
  };
}
export default function App() {
  const [winsize, setWinsize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  function handleresize() {
    setWinsize({ height: window.innerHeight, width: window.innerWidth });
  }
  const throttleval = useThrottle(handleresize, 1000);
  useEffect(() => {
    window.addEventListener("resize", throttleval);

    return () => {
      window.removeEventListener("resize", throttleval);
    };
  }, []);
  return (
    <div>
      <div>
        height:{winsize.height}Xwidth:{winsize.width}
      </div>
    </div>
  );
}
