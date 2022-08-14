import { useEffect, useState } from "react";
import Switch from "../../../Switch";
import BaseProps from "../BaseProps";

const PointsToLose = ({ onPointsToLose }: BaseProps) => {
	const [p, setP] = useState<number>(51);
	const handlePoints = (n: number) => {
		setP(n);
		onPointsToLose(n);
	};
	useEffect(() => {
		onPointsToLose(p);
	}, [onPointsToLose, p]);
	return (
		<div className="rounded-xl p-4 bg-slate-700">
			<p className="text-xl">Punti per perdere</p>
			<div className="flex justify-center items-center">
				<Switch active={p === 51} onClick={() => handlePoints(51)} activeLabel="51" inactiveLabel="51" />
				<Switch active={p === 101} onClick={() => handlePoints(101)} activeLabel="101" inactiveLabel="101" />
			</div>
		</div>
	);
};

export default PointsToLose;
