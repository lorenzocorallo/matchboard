import { useContext } from "react";
import { useState } from "react";
import { MatchesContext } from "../context/MatchesContext";
import Match from "../types/Match";
import Player from "../types/Player";
import Button from "./Button";
import Header from "./Header";
import Switch from "./Switch";
import TextField from "./TextField";
import Wrapper from "./Wrapper";

const PlayerNum = ({ stateNum, num, setNum }: { stateNum: number; num: number; setNum: (num: number) => void }) => {
	const numStr = num.toString();
	return (
		<Switch
			className="text-lg"
			active={stateNum === num}
			onClick={() => setNum(num)}
			activeLabel={numStr}
			inactiveLabel={numStr}
		/>
	);
};

const NewMatch = () => {
	const [isSquadGame, setIsSquadGame] = useState(false);
	const [num, setNum] = useState<number>(2);
	const [name, setName] = useState<string>("Burraco ");
	const { addMatch } = useContext(MatchesContext);

	const handleSwitchGameType = () => {
		setIsSquadGame((p) => !p);
	};

	const handleCreate = () => {
		const names = [...Array(num)].map((_, i) => `${isSquadGame ? "Squadra" : "Giocatore"} ${i + 1}`);
		const players: Player[] = names.map((name) => {
			return {
				name,
				points: [],
				score: 0,
			};
		});
		const newMatch: Match = {
			date: new Date(),
			finished: false,
			id: `${Date.now()}-${(Math.random() * 100).toFixed(0)}`,
			name,
			players,
		};
		addMatch(newMatch);
	};

	return (
		<Wrapper>
			<Header title="Nuova partita" />
			<div className="flex flex-col gap-4 p-5 flex-1">
				<TextField label="Nome partita" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
				<div>
					<p>Tipo di partita</p>
					<div className="flex justify-center items-center">
						<Switch
							className="text-lg"
							active={!isSquadGame}
							onClick={handleSwitchGameType}
							activeLabel="Singolo"
							inactiveLabel="Singolo"
						/>
						<Switch
							className="text-lg"
							active={isSquadGame}
							onClick={handleSwitchGameType}
							activeLabel="Squadre"
							inactiveLabel="Squadre"
						/>
					</div>
				</div>
				<div>
					<p>{isSquadGame ? "Quante squadre" : "Quanti giocatori"}</p>
					<div className="flex justify-center items-center">
						<PlayerNum stateNum={num} num={2} setNum={setNum} />
						<PlayerNum stateNum={num} num={3} setNum={setNum} />
						<PlayerNum stateNum={num} num={4} setNum={setNum} />
					</div>
				</div>
				<div className="flex-1"></div>
				<Button theme="success" className="text-2xl" onClick={handleCreate}>
					Inizia partita
				</Button>
			</div>
		</Wrapper>
	);
};

export default NewMatch;
