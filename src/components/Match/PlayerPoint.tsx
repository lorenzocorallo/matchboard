import { useState } from "react";
import useLongPress from "../../hooks/useLongPress";
import Player from "../../types/Player";
import PointsPrompt from "./PointsPrompt";

interface Props {
	player: Player;
	index: number;
	onPlayerChange: (p: Player) => void;
}

const PlayerPoint = ({ player, index, onPlayerChange }: Props) => {
	const point = player.points[index];
	const [modifyPromptActive, setModifyPromptActive] = useState(false);

	const handleOpenModifyPoints = () => {
		if (!point) return;
		setModifyPromptActive(true);
	};

	const handleOnPoints = (points: number) => {
		setModifyPromptActive(false);
		if (points === 0) return;
		const newPlayer = { ...player };
		newPlayer.points[index] = points;
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
			<PointsPrompt
				modifyPoint={point}
				active={modifyPromptActive}
				onValue={handleOnPoints}
				onClose={() => setModifyPromptActive(false)}
				onDelete={handleDelete}
			/>

			<button className="w-full py-3 select-none border-b-[1px] border-slate-600 dark:border-white" {...handlers}>
				{point}
			</button>
		</>
	);
};

export default PlayerPoint;
