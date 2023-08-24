import { useState } from "react";
import useLongPress from "../../hooks/useLongPress";
import { Game } from "../../types/Game";
import Player from "../../types/Player";
import Prompt from "../Prompt";

interface Props {
  game: Game;
	player: Player;
	index: number;
	onPlayerChange: (p: Player) => void;
}

const PlayerPoint = ({ game, player, index, onPlayerChange }: Props) => {
	const [point] = useState<number>(player.points[index]);
	const [isPromptOpen, setIsPromptOpen] = useState(false);

	const handleOpenModifyPoints = () => {
		setIsPromptOpen(true);
	};

	const handleOnValue = (value: string) => {
		const newPlayer = { ...player };
		const points = value.toInt();
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
			<Prompt
				value={point.toString()}
				type="number"
				active={isPromptOpen}
				onValue={handleOnValue}
				onClose={() => setIsPromptOpen(false)}
				onDelete={handleDelete}
        label={game.addType === "wins" ? "Elimina punteggio" : "Modifica punteggio"}
        showInput={game.addType === "points"}
        showPrevValue={game.addType === "points"}
			/>

			<button className="w-full p-2 select-none border-b-[1px] border-slate-600 dark:border-white" {...handlers}>
				{point}
			</button>
		</>
	);
};

export default PlayerPoint;
