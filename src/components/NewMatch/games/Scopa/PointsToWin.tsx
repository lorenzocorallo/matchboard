import { useEffect, useState } from "react";
import Switch from "../../../Switch";
import BaseProps from "../BaseProps";

const PointsToWin = ({ onPointsToWin }: BaseProps) => {
	const [p, setP] = useState<number>(31);
	const handlePoints = (n: number) => {
		setP(n);
		onPointsToWin(n);
	};
	useEffect(() => {
		onPointsToWin(p);
	}, [onPointsToWin, p]);
	return (
		<div className="rounded-xl p-4 bg-slate-700">
			<p className="text-xl">Punti per vincere</p>
			<div className="flex justify-center items-center">
				<Switch active={p === 11} onClick={() => handlePoints(11)} activeLabel="11" inactiveLabel="11" />
				<Switch active={p === 21} onClick={() => handlePoints(21)} activeLabel="21" inactiveLabel="21" />
				<Switch active={p === 31} onClick={() => handlePoints(31)} activeLabel="31" inactiveLabel="31" />
			</div>
		</div>
	);
};

export default PointsToWin;
