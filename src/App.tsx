import { useState, useEffect, useRef } from "react";
function useThrottle(val, delay) {
  const [throttleval, setThrottleval] = useState(val);
  const lastElapsed = useRef(Date.now());
  useEffect(() => {
    const handler = setTimeout(
      () => {
        const now = Date.now();
        const timeElapsed = now - lastElapsed.current;
        if (timeElapsed >= delay) {
          setThrottleval(val);
          lastElapsed.current = now;
        }
      },
      delay - (Date.now() - lastElapsed.current),
    );
    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);
  return throttleval;
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
