import { useState } from "react";
import BaseProps from "../BaseProps";
import PointsSelect from "../PointsSelect";

const Macchiavelli = ({ onPointsToLose }: BaseProps) => {
	const [points] = useState([51, 101, 151]);
	return <PointsSelect onValue={onPointsToLose} points={points} isWinMethod={false} />;
};

export default Macchiavelli;
