import { useContext, useState } from "react";
import { IoArrowForward, IoHandRight, IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MatchesContext } from "../../context/MatchesContext";
import Match from "../../types/Match";
import Player from "../../types/Player";
import Button from "../Button";
import Header from "../Header";
import TextField from "../TextField";
import Wrapper from "../Wrapper";
import AddPlayer from "./AddPlayer";

const NewMatch = () => {
	const [name, setName] = useState<string>("Burraco ");
	const [addPlayerActive, setAddPlayerActive] = useState<boolean>(false);
	const [players, setPlayers] = useState<Player[]>([]);
	const { addMatch } = useContext(MatchesContext);
	const navigate = useNavigate();

	const handleCreate = () => {
		if (players.length < 2) return;
		const newMatch: Match = {
			id: uuidv4(),
			date: new Date(),
			finished: false,
			name,
			players,
		};
		addMatch(newMatch);
		navigate(`/match/${newMatch.id}`);
	};

	const handleAddPlayer = (player: Player) => {
		setAddPlayerActive(false);
		const newPlayers = [...players, player];
		setPlayers(newPlayers);
	};

	const handleDeletePlayer = (id: string) => {
		setPlayers((p) => [...p].filter((p) => p.id !== id));
	};

	return (
		<Wrapper>
			<AddPlayer active={addPlayerActive} onClose={() => setAddPlayerActive(false)} onPlayer={handleAddPlayer} />
			<Header backPath="/" title="Nuova partita" />
			<div className="flex flex-col gap-4 p-5 flex-1 w-full">
				<TextField label="Nome partita" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
				<div className="flex-1 w-full mt-2">
					<div className="flex bg-white dark:bg-slate-700 rounded-xl justify-between items-center px-2">
						<p className="text-lg">Giocatori/Squadre</p>
						<Button className="mx-0 focus:bg-slate-500" onClick={() => setAddPlayerActive(true)}>
							Aggiungi
						</Button>
					</div>
					{players.map((player, i) => (
						<p key={player.id} className="flex items-center gap-1 bg-white dark:bg-slate-700 rounded-xl p-2 my-2">
							<span className="text-gray-500 dark:text-gray-400">G{i + 1}</span>
							<IoArrowForward size={18} className="text-gray-500 dark:text-gray-400" />
							<p className="flex-1 text-left">{player.name}</p>
							<Button theme="error" className="m-0 px-2 py-2" onClick={() => handleDeletePlayer(player.id)}>
								<IoTrash size={18} />
							</Button>
						</p>
					))}
				</div>

				<Button theme="success" className="text-2xl" disabled={players.length < 2} onClick={handleCreate}>
					Inizia partita
				</Button>
			</div>
		</Wrapper>
	);
};

export default NewMatch;
