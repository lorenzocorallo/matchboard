import { useEffect, useState } from "react";
import Paper from "../../../Paper";
import Switch from "../../../Switch";
import BaseProps from "../BaseProps";
import PointsSelect from "../PointsSelect";

const Burraco = ({ onPointsToWin }: BaseProps) => {
	const [points, setPoints] = useState<number[]>([]);
	const [useDelta, setUseDelta] = useState<boolean>(false);
	useEffect(() => {
		setPoints(useDelta ? [505, 1005, 2005] : [500, 1000, 2000]);
	}, [useDelta]);

	return (
		<>
			<Paper className="py-1">
				Utilizza punteggi +5 <Switch active={useDelta} onClick={() => setUseDelta((v) => !v)} />
			</Paper>
			<PointsSelect onValue={onPointsToWin} points={points} />
		</>
	);
};

export default Burraco;
