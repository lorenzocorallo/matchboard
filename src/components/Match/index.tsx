import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MatchesContext } from "../../context/MatchesContext";
import Player from "../../types/Player";
import IMatch from "../../types/Match";
import Button from "../Button";
import Header from "../Header";
import Wrapper from "../Wrapper";
import MatchPlayer from "./MatchPlayer";
import LoadingSpinner from "../LoadingSpinner";
import { IoReload, IoTrash } from "react-icons/io5";

const Match = () => {
  const { matches, updateMatch, deleteMatch, addMatch } =
    useContext(MatchesContext);
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
    if (newPlayers.some((p) => p.score >= match.chosenPoints)) {
      if (match.game.mode === "win") {
        const sortedByScore = [...newPlayers].sort((a, b) => b.score - a.score);
        const ok = sortedByScore[0].score > sortedByScore[1].score;
        if (ok) {
          const winnerId = sortedByScore[0].id;
          newPlayers.forEach((player) => {
            player.winner = player.id === winnerId;
            player.loser = player.id !== winnerId;
          });
          finished = true;
        }
      } else {
        newPlayers.forEach((p) => {
          if (p.score >= match.chosenPoints) {
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
          const sortedByScore = [...newPlayers].sort(
            (a, b) => a.score - b.score,
          );
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
    } else {
      newPlayers.forEach((p) => {
        p.winner = false;
        p.loser = false;
      });
    }
    const newMatch = { ...match, players: newPlayers, finished };
    setMatch(newMatch);
    updateMatch(newMatch);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      `Sei sicuro di voler cancellare questa partita? (quest'azione non si può regredire)`,
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
      players: match.players.map((p) => ({
        ...p,
        points: [],
        score: 0,
        winner: false,
        loser: false,
      })),
    };
    addMatch(newMatch);
    navigate(`/match/${newMatch.id}`);
  };

  useEffect(() => {
    const match = matches.find((m) => m.id === id);
    if (!match) return;
    setTimeout(() => {
      setMatch(match);
    }, 300);
  }, [matches, id]);

  return (
    <Wrapper>
      <Header backPath="/" />
      {match ? (
        <div className="px-5 w-full flex flex-col flex-1 py-4 gap-2">
          <div>
            <p className="flex">
              <span className="flex-1 text-left">
                {match ? `${match.name.trimEnd()} ` : "Partita in caricamento "}(
                {match.game.name}){" "}
              </span>
              {match.date.toLocaleDateString()}
            </p>
            <p className="flex justify-between">
              <span
                className={
                  match.finished
                    ? "text-green-400"
                    : "dark:text-yellow-400 text-orange-500"
                }
              >
                {match.finished ? "Finita" : "In Corso"}
              </span>
            </p>
            <div className="flex justify-between items-center">
              <p className="flex-1 text-left text-gray-600 dark:text-gray-400">
                Punti per {match.game.mode === "win" ? "vincere" : "perdere"}:
                <span className="text-black dark:text-white">
                  {" "}
                  {match.chosenPoints}
                </span>
              </p>
              <div className="flex gap-2 items-center justify-center">
                {match.finished && (
                  <Button theme="success" onClick={handleRematch}>
                  <IoReload size={18} />
                  </Button>
                )}
                <Button theme="error" onClick={handleDelete}>
                  <IoTrash size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-full border-[1px] flex-1 rounded-md overflow-hidden [&_*]:border-slate-400 border-slate-400 [&_*]:dark:border-slate-200/40 dark:border-slate-200/40">
            {match.players.map((p, i) => (
              <MatchPlayer
                game={match.game}
                player={p}
                last={match.players.length - 1 === i}
                key={p.name}
                onPlayerChange={handlePlayerChange}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 grid place-content-center">
          <LoadingSpinner size={48} />
        </div>
      )}
    </Wrapper>
  );
};

export default Match;
