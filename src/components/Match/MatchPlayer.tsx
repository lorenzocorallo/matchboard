import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Player from "../../types/Player";
import Button from "../Button";
import PlayerPoint from "./PlayerPoint";
import Prompt from "../Prompt";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	player: Player;
	onPlayerChange: (p: Player) => void;
	last?: boolean;
}

const MatchPlayer = ({ player, last = false, onPlayerChange }: Props) => {
	const [active, setActive] = useState(false);

	const handleOnPoints = (value: string) => {
		setActive(false);
		const points = parseInt(value);
		if (points === 0) return;
		const newPlayer = {
			...player,
			points: [...player.points, points],
			score: [...player.points, points].reduce((acc, cur) => acc + cur, 0),
		};
		onPlayerChange(newPlayer);
	};

	const open = () => {
		setActive(true);
	};

	const close = () => {
		setActive(false);
	};

	return (
		<>
			<Prompt active={active} onValue={handleOnPoints} onClose={close} />
			<div
				className={`flex flex-col flex-1 h-full ${last ? "" : "border-r-[1px]"} border-slate-600 dark:border-white
				${player.winner && "bg-green-900 bg-opacity-70 text-white"} ${player.loser && "bg-red-900 bg-opacity-70 text-white"}  `}
			>
				<div className="p-2 border-b-[1px] border-slate-600 dark:border-white">
					<p>{player.name}</p>
				</div>

				<div className="flex-1">
					{player.points.map((p, i) => (
						<PlayerPoint
							key={`p-${p}-${(Math.random() * 100).toFixed(0)}`}
							player={player}
							index={i}
							onPlayerChange={onPlayerChange}
						/>
					))}
				</div>

				<p className="py-3 border-y-[1px] border-slate-600 dark:border-white">
					<span className="opacity-60 pr-2">Tot:</span>
					{player.score}
				</p>

				<Button theme="success" className="text-2xl py-1 flex justify-center" onClick={open}>
					<IoAdd size={28} />
				</Button>
			</div>
		</>
	);
};

export default MatchPlayer;
