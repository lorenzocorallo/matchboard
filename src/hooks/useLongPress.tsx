import { useState } from "react";

function useLongPress(callback: () => void, ms: number = 500) {
  const [timer, setTimer] = useState<any>();
  const [timerExists, setTimerExists] = useState(false);

  function startPressTime(): void {
    if (timerExists) return;

    setTimer(
      setTimeout(() => {
        callback();
      }, ms),
    );
  }

  function cancelPress(): void {
    clearTimeout(timer);
    setTimerExists(false);
  }

  return {
    handlers: {
      onMouseDown: startPressTime,
      onTouchStart: startPressTime,
      onMouseUp: cancelPress,
      onTouchEnd: cancelPress,
    },
  };
}

export default useLongPress;
