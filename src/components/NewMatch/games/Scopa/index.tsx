import BaseProps from "../BaseProps";
import PointsSelect from "../PointsSelect";

const Scopa = ({ onPointsToWin }: BaseProps) => {
	return <PointsSelect points={[11, 21, 31]} onValue={onPointsToWin} />;
};

export default Scopa;
