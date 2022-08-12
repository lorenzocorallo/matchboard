import { useState } from "react";

const useLongPress = (callback: () => void, ms: number = 500) => {
	const [timer, setTimer] = useState<any>();
	const [timerExists, setTimerExists] = useState(false);

	const startPressTime = () => {
		if (timerExists) return;

		setTimer(
			setTimeout(() => {
				callback();
			}, ms)
		);
	};

	const cancelPress = () => {
		clearTimeout(timer);
		setTimerExists(false);
	};

	return {
		handlers: {
			onMouseDown: startPressTime,
			onTouchStart: startPressTime,
			onMouseUp: cancelPress,
			onTouchEnd: cancelPress,
		},
	};
};

export default useLongPress;
