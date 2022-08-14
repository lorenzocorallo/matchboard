import { useEffect } from "react";
import BaseProps from "../BaseProps";

const Burraco = ({ onPointsToWin }: BaseProps) => {
	useEffect(() => {
		onPointsToWin(2000);
	}, [onPointsToWin]);
	return <></>;
};

export default Burraco;
