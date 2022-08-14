import { useState } from "react";
import useLongPress from "../../hooks/useLongPress";
import Player from "../../types/Player";
import Prompt from "../Prompt";

interface Props {
	player: Player;
	index: number;
	onPlayerChange: (p: Player) => void;
}

const PlayerPoint = ({ player, index, onPlayerChange }: Props) => {
	const point = player.points[index];
	const [active, setActive] = useState(false);

	const handleOpenModifyPoints = () => {
		if (!point) return;
		setActive(true);
	};

	const handleOnPoints = (points: string) => {
		setActive(false);

		const newPlayer = { ...player };
		newPlayer.points[index] = parseInt(points);
		newPlayer.score = newPlayer.points.reduce((acc, cur) => acc + cur, 0);
		onPlayerChange(newPlayer);
	};

	const handleDelete = () => {
		const newPlayer = { ...player };
		newPlayer.points.splice(index, 1);
		newPlayer.score = newPlayer.points.reduce((acc, cur) => acc + cur, 0);
		onPlayerChange(newPlayer);
	};

	const { handlers } = useLongPress(handleOpenModifyPoints);
	return (
		<>
			<Prompt
				value={point.toString()}
				type="number"
				active={active}
				onValue={handleOnPoints}
				onClose={() => setActive(false)}
				onDelete={handleDelete}
			/>

			<button className="w-full py-3 select-none border-b-[1px] border-slate-600 dark:border-white" {...handlers}>
				{point}
			</button>
		</>
	);
};

export default PlayerPoint;
