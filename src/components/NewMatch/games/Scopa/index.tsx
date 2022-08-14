import BaseProps from "../BaseProps";
import PointsToWin from "./PointsToWin";

const Scopa = ({ onPointsToWin }: BaseProps) => {
	return <PointsToWin onPointsToWin={onPointsToWin} onPointsToLose={() => {}} />;
};

export default Scopa;
