import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MatchesContext } from "../../context/MatchesContext";
import Player from "../../types/Player";
import IMatch from "../../types/Match";
import Button from "../Button";
import Header from "../Header";
import Wrapper from "../Wrapper";
import MatchPlayer from "./MatchPlayer";

const Match = () => {
	const { matches, updateMatch, deleteMatch, addMatch } = useContext(MatchesContext);
	const { id } = useParams();
	const [match, setMatch] = useState<IMatch | null>();
	const navigate = useNavigate();

	const handlePlayerChange = (p: Player) => {
		if (!match) return;
		//update match player with p
		const newPlayers = match.players.map((player) => {
			if (player.id === p.id) return p;
			return player;
		});
		let finished = false;
		if (newPlayers.some((p) => p.score >= match.pointsToWin)) {
			if (match.isWinMethod) {
				const sortedByScore = [...newPlayers].sort((a, b) => b.score - a.score);
				const ok = sortedByScore[0].score > sortedByScore[1].score;
				if (ok) {
					const winnerId = sortedByScore[0].id;
					newPlayers.forEach((player) => {
						player.winner = player.id === winnerId;
					});
					finished = true;
				}
			} else {
				newPlayers.forEach((p) => {
					if (p.score >= match.pointsToWin) {
						p.loser = true;
						p.winner = false;
					}
				});
				const filtered = [...newPlayers].filter((p) => !p.loser);
				if (filtered.length === 1) {
					newPlayers.forEach((player) => {
						player.winner = player.id === filtered[0].id;
						player.loser = player.id !== filtered[0].id;
					});
					newPlayers.find((p) => p.id === filtered[0].id)!.winner = true;
					finished = true;
				} else if (filtered.length === 0) {
					const sortedByScore = [...newPlayers].sort((a, b) => a.score - b.score);
					const ok = sortedByScore[0].score < sortedByScore[1].score;
					if (ok) {
						const winnerId = sortedByScore[0].id;
						newPlayers.forEach((player) => {
							player.winner = player.id === winnerId;
							player.loser = player.id !== winnerId;
						});
						finished = true;
					}
				}
			}
		}
		const newMatch = { ...match, players: newPlayers, finished };
		setMatch(newMatch);
		updateMatch(newMatch);
	};

	const handleDelete = () => {
		const confirm = window.confirm(
			`Sei sicuro di voler cancellare questa partita? (quest'azione non si può regredire)`
		);
		if (!confirm || !id) return;
		deleteMatch(id);
		navigate("/");
	};

	const handleRematch = () => {
		if (!match) return;
		const newMatch: IMatch = {
			...match,
			date: new Date(),
			finished: false,
			id: uuidv4(),
			players: match.players.map((p) => ({ ...p, points: [], score: 0, winner: false, loser: false })),
		};
		addMatch(newMatch);
		navigate(`/match/${newMatch.id}`);
	};

	useEffect(() => {
		const match = matches.find((m) => m.id === id);
		if (!match) return;
		setMatch(match);
	}, [matches, id]);

	return (
		<Wrapper>
			<Header backPath="/" title={match ? `Partita: ${match.name.trimEnd()}` : "Partita non trovata"} />
			{match ? (
				<div className="px-5 w-full flex flex-col flex-1 gap-4 py-4">
					<div className="flex justify-between">
						<p className={match.finished ? "text-green-400" : "dark:text-yellow-400 text-orange-400"}>
							{match.finished ? "Finita" : "In Corso"}
						</p>
						<p>{match.date.toLocaleDateString()}</p>
					</div>
					<div className="flex w-full border-[1px] flex-1 rounded-xl overflow-hidden border-slate-600 dark:border-white">
						{match.players.map((p, i) => (
							<MatchPlayer
								player={p}
								last={match.players.length - 1 === i}
								key={p.name}
								onPlayerChange={handlePlayerChange}
							/>
						))}
					</div>
					<p className="text-gray-600 dark:text-gray-400">
						Punti per {match.isWinMethod ? "vincere" : "perdere"}:
						<span className="text-black dark:text-white"> {match.pointsToWin}</span>
					</p>
					<div className="block">
						{match.finished && (
							<Button theme="success" onClick={handleRematch}>
								Rivincita
							</Button>
						)}
						<Button theme="error" onClick={handleDelete}>
							Cancella
						</Button>
					</div>
				</div>
			) : (
				<Link to="/">
					<Button>Torna indietro</Button>
				</Link>
			)}
		</Wrapper>
	);
};

export default Match;
