import BaseProps from "../BaseProps";
import PointsToLose from "./PointsToLose";

const Macchiavelli = ({ onPointsToLose }: BaseProps) => {
	return <PointsToLose onPointsToLose={onPointsToLose} onPointsToWin={() => {}} />;
};

export default Macchiavelli;
