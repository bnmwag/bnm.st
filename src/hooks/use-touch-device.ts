import { useEffect, useState } from "react";

export const useTouchDevice = () => {
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		const hasTouch = window.matchMedia("(pointer: coarse)").matches;
		setIsTouchDevice(hasTouch);
	}, []);

	return isTouchDevice;
};
