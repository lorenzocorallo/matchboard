import BaseProps from "../BaseProps";
import PointsSelect from "../PointsSelect";

const Burraco = ({ onPointsToWin }: BaseProps) => {
	return <PointsSelect onValue={onPointsToWin} points={[505, 1005, 2005]} />;
};

export default Burraco;
