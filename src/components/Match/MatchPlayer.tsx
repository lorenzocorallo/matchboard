import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Player from "../../types/Player";
import Button from "../Button";
import PointsPrompt from "./PointsPrompt";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	player: Player;
	onPlayerChange: (p: Player) => void;
	last?: boolean;
}

const MatchPlayer = ({ player, last = false, onPlayerChange }: Props) => {
	const [pointsPromptActive, setPointsPromptActive] = useState(false);
	const handleAddPoints = (points: number) => {
		setPointsPromptActive(false);
		if (points === 0) return;
		const newPlayer = {
			...player,
			points: [...player.points, points],
			score: [...player.points, points].reduce((acc, cur) => acc + cur, 0),
		};
		onPlayerChange(newPlayer);
	};

	return (
		<>
			<PointsPrompt
				active={pointsPromptActive}
				onValue={handleAddPoints}
				onClose={() => setPointsPromptActive(false)}
			/>
			<div
				className={`flex flex-col flex-1 h-full ${last ? "" : "border-r-[1px]"} ${
					player.winner && "bg-green-900 bg-opacity-70 text-white"
				}`}
			>
				<div className="p-2">
					<p>{player.name}</p>
				</div>
				<hr />
				<div className="flex-1">
					{player.points.map((p, i) => (
						<div key={`p-${p}-${(Math.random() * 100).toFixed(0)}`}>
							<p className="py-3">{p}</p>
							<hr />
						</div>
					))}
				</div>

				<hr />
				<p className="py-3">
					<span className="opacity-60 pr-2">Tot:</span>
					{player.score}
				</p>
				<hr />
				<Button
					theme="success"
					className="text-2xl py-1 flex justify-center"
					onClick={() => {
						setPointsPromptActive(true);
					}}
				>
					<IoAdd size={28} />
				</Button>
			</div>
		</>
	);
};

export default MatchPlayer;
