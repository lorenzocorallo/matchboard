import React, { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
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
	const [multi, setMulti] = useState<1 | -1>(1);

	const handleOnPoints = (value: string) => {
		const points = value.toInt() * multi;
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
			<Prompt
				active={active}
				onValue={handleOnPoints}
				onClose={close}
				type="number"
				label={multi === 1 ? "Inserisci nuovo punteggio (+)" : "Inserisci nuovo punteggio (-)"}
			/>
			<div
				className={`flex flex-col flex-1 h-full ${last ? "" : "border-r-[1px]"} border-slate-400 dark:border-white
				${player.winner && "bg-green-900 bg-opacity-70 text-white"} ${player.loser && "bg-red-900 bg-opacity-70 text-white"}  `}
			>
				<div className="p-2 border-b-[1px] border-slate-400 dark:border-white">
					<p>{player.name.toCapitalCase()}</p>
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

				<p className="py-3 border-y-[1px] border-slate-400 dark:border-white">
					<span className="opacity-60 pr-2">Tot:</span>
					{player.score}
				</p>

				<Button
					theme="success"
					className="text-2xl py-1 flex justify-center"
					onClick={() => {
						open();
						setMulti(1);
					}}
				>
					<IoAdd size={28} />
				</Button>
				<Button
					theme="error"
					className="text-2xl py-1 flex justify-center"
					onClick={() => {
						open();
						setMulti(-1);
					}}
				>
					<IoRemove size={28} />
				</Button>
			</div>
		</>
	);
};

export default MatchPlayer;
