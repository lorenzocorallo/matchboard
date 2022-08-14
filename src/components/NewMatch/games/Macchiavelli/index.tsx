import BaseProps from "../BaseProps";
import PointsSelect from "../PointsSelect";

const Macchiavelli = ({ onPointsToLose }: BaseProps) => {
	return <PointsSelect onValue={onPointsToLose} points={[51, 101, 151]} isWinMethod={false} />;
};

export default Macchiavelli;
