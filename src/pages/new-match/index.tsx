import { useContext, useState } from "react";
import { IoArrowForward, IoTrash } from "react-icons/io5";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MatchesContext } from "@/context/matches";
import Match from "@/types/match";
import PlayerType from "@/types/player";
import { createPlayer } from "@/utils/players";
import Button from "@/components/button";
import Header from "@/components/header";
import TextField from "@/components/text-field";
import Wrapper from "@/components/wrapper";
import Prompt from "@/components/prompt";
import Paper from "@/components/paper";
import GAMES from "@/data/games";
import PointsSelect from "./points-select";

export default function NewMatch() {
  const [name, setName] = useState<string>("Match");
  const [addPlayerActive, setAddPlayerActive] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const { addMatch } = useContext(MatchesContext);
  const navigate = useNavigate();

  const { gameId } = useParams<{ gameId: string }>()!;
  const game = GAMES.find((g) => g.id === gameId);
  if (!game) return <Navigate to="/new" />;

  const [isWithDelta, setIsWithDelta] = useState<boolean>(false);
  const defaultPoints = game.defaultPoints.map((p) =>
    isWithDelta && game.deltaPoints ? p + game.deltaPoints : p,
  );

  const defaultSelectedPoints =
    defaultPoints[parseInt((defaultPoints.length / 2).toFixed(0)) - 1];
  const [isSelectedPoints, setIsSelectedPoints] = useState<boolean>(false);
  const [selectedPoints, setSelectedPoints] = useState<number>(
    defaultSelectedPoints,
  );

  const chosenPoints = isSelectedPoints ? selectedPoints: defaultSelectedPoints;

  function handleCreate(): void {
    if (players.length < 2 || !game) return;
    const newMatch: Match = {
      id: uuidv4(),
      date: new Date(),
      finished: false,
      name,
      players,
      chosenPoints,
      game,
    };
    addMatch(newMatch);
    navigate(`/match/${newMatch.id}`);
  }

  function handleCreatePlayer(name: string): void {
    setAddPlayerActive(false);
    const newPlayers = [...players, createPlayer({ name })];
    setPlayers(newPlayers);
  }

  function handleDeletePlayer(id: string): void {
    setPlayers((p) => [...p].filter((p) => p.id !== id));
  }

  function handleSetPoints(n: number): void {
    if (n <= 0) return;
    setIsSelectedPoints(true);
    setSelectedPoints(n);
  }

  function handleWithDeltaToggle(): void {
    setIsWithDelta(v => !v);
    setIsSelectedPoints(false);
  }

  function handleDefaultPlayers(): void {
    setPlayers([createPlayer({ name: "Noi" }), createPlayer({ name: "Voi" })]);
  }

  return game ? (
    <Wrapper>
      <Prompt
        active={addPlayerActive}
        onClose={() => setAddPlayerActive(false)}
        onValue={handleCreatePlayer}
        label="Inserisci nome"
      />
      <Header backPath="/new" title="Nuova partita" />
      <div className="flex flex-col gap-2 p-5 flex-1 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-300 scrollbar-thumb-gray-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <h3 className="text-xl">
          <span className="dark:text-gray-400 text-gray-600">Gioco: </span>
          {game.name}
        </h3>
        <TextField
          label="Nome partita"
          type="text"
          fullWidth
          value={name}
          placeholder="Match"
          onChange={(e) => setName(e.target.value)}
          onFocus={() => name === "Match" && setName("")}
          onBlur={() => name === "" && setName("Match")}
        />
        <PointsSelect
          points={defaultPoints}
          hasDeltaPoints={!!game.deltaPoints}
          isWithDelta={isWithDelta}
          onWithDeltaToggle={handleWithDeltaToggle}
          selectedPoints={chosenPoints}
          onValue={handleSetPoints}
          label={
            game.mode === "win" ? "Punti per vincere" : "Punti per perdere"
          }
        />
        <div className="flex-1 w-full">
          <Paper>
            <div className="flex items-center w-full justify-between">
              <p className="text-lg">Squadre</p>
              <Button onClick={handleDefaultPlayers}>Default</Button>
            </div>
            {players.map((player, i) => (
              <Player
                index={i + 1}
                player={player}
                key={player.id}
                onDelete={handleDeletePlayer}
              />
            ))}
            <Button
              className="w-full focus:bg-slate-500"
              onClick={() => setAddPlayerActive(true)}
            >
              Aggiungi
            </Button>
          </Paper>
        </div>

        {players.length < 2 && (
          <p className="text-red-600 dark:text-red-400">
            Aggiungi almeno 2 squadre
          </p>
        )}
        <Button
          theme="success"
          className="text-2xl"
          disabled={players.length < 2}
          onClick={handleCreate}
        >
          Inizia partita
        </Button>
      </div>
    </Wrapper>
  ) : (
    <></>
  );
}

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  player: PlayerType;
  onDelete: (id: string) => void;
  index: number;
}
function Player({ player, index, onDelete }: PlayerProps) {
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);

  function handleClosePrompt(): void {
    setIsPromptOpen(false);
  }

  function handleOpenPrompt(): void {
    setIsPromptOpen(true);
  }

  function handleModifyPlayer(name: string): void {
    if (name.length === 0) return;
    player.name = name;
  }

  return (
    <>
      <Prompt
        active={isPromptOpen}
        onClose={handleClosePrompt}
        value={player.name}
        onValue={handleModifyPlayer}
        label="Modifica nome"
      />
      <div
        className="w-full border rounded-md flex items-center gap-1 border-slate-400 dark:border-slate-200/40 p-1 cursor-pointer"
        onClick={handleOpenPrompt}
      >
        <span className="text-gray-500 dark:text-gray-400">G{index}</span>
        <IoArrowForward
          size={18}
          className="text-gray-500 dark:text-gray-400"
        />
        <p className="flex-1 text-left">{player.name}</p>
        <Button
          theme="error"
          className="px-2 py-2"
          onClick={() => onDelete(player.id)}
        >
          <IoTrash size={18} />
        </Button>
      </div>
    </>
  );
}
