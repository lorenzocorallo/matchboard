import { useState } from "react";
import BaseProps from "../BaseProps";
import PointsSelect from "../PointsSelect";

const Scopa = ({ onPointsToWin }: BaseProps) => {
	const [points] = useState([11, 21, 31]);
	return <PointsSelect points={points} onValue={onPointsToWin} />;
};

export default Scopa;
