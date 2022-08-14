import { useContext, useEffect, useState } from "react";
import { IoArrowForward, IoTrash } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { GAMES } from "../../constants";
import { MatchesContext } from "../../context/MatchesContext";
import Match, { Game } from "../../types/Match";
import Player from "../../types/Player";
import Button from "../Button";
import Header from "../Header";
import TextField from "../TextField";
import Wrapper from "../Wrapper";
import AddPlayer from "./AddPlayer";
import Burraco from "./games/Burraco";
import Scopa from "./games/Scopa";

const NewMatch = () => {
	const [name, setName] = useState<string>("");
	const [pointsToWin, setPointsToWin] = useState<number>(1000);
	const [addPlayerActive, setAddPlayerActive] = useState<boolean>(false);
	const [players, setPlayers] = useState<Player[]>([]);
	const { addMatch } = useContext(MatchesContext);
	const navigate = useNavigate();

	const { game } = useParams<{ game: Game }>()!;

	useEffect(() => {
		if (!game || !GAMES.includes(game)) return navigate("/new");
		setName(game.toCapitalCase() + " ");
	}, [game, navigate]);

	const handleCreate = () => {
		if (players.length < 2) return;
		const newMatch: Match = {
			id: uuidv4(),
			date: new Date(),
			finished: false,
			name,
			players,
			pointsToWin,
			game: "burraco",
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

	const handleSetPointsToWin = (n: number) => {
		console.log("Set pointsToWin", n);
		if (n <= 0) return;
		setPointsToWin(n);
	};

	if (!game) return <></>;
	return (
		<Wrapper>
			<AddPlayer active={addPlayerActive} onClose={() => setAddPlayerActive(false)} onPlayer={handleAddPlayer} />
			<Header backPath="/new" title="Nuova partita" />
			<div className="flex flex-col gap-5 p-5 flex-1 w-full">
				<h3 className="text-xl">
					<span className="dark:text-gray-400 text-gray-600">Gioco: </span>
					{game.toCapitalCase()}
				</h3>
				<TextField label="Nome partita" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
				{game === "scopa" && <Scopa onPointsToWin={handleSetPointsToWin} />}
				{game === "burraco" && <Burraco onPointsToWin={handleSetPointsToWin} />}
				<div className="flex-1 w-full">
					<div className="flex bg-white dark:bg-slate-700 rounded-xl justify-between items-center px-2">
						<p className="text-lg">Giocatori/Squadre</p>
						<Button className="mx-0 focus:bg-slate-500" onClick={() => setAddPlayerActive(true)}>
							Aggiungi
						</Button>
					</div>
					{players.map((player, i) => (
						<div key={player.id} className="flex items-center gap-1 bg-white dark:bg-slate-700 rounded-xl p-2 my-2">
							<span className="text-gray-500 dark:text-gray-400">G{i + 1}</span>
							<IoArrowForward size={18} className="text-gray-500 dark:text-gray-400" />
							<p className="flex-1 text-left">{player.name}</p>
							<Button theme="error" className="m-0 px-2 py-2" onClick={() => handleDeletePlayer(player.id)}>
								<IoTrash size={18} />
							</Button>
						</div>
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
