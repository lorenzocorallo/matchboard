import React, { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import Player from "../../types/Player";
import Button from "../Button";
import PlayerPoint from "./PlayerPoint";
import Prompt from "../Prompt";
import { Game } from "../../types/Game";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  game: Game;
  player: Player;
  onPlayerChange: (p: Player) => void;
  last?: boolean;
}

function MatchPlayer ({ game, player, last = false, onPlayerChange }: Props) {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [multi, setMulti] = useState<1 | -1>(1);

  function handleOnPointsStr(value: string): void {
    const points = value.toInt() * multi;
    handleOnPoints(points);
  }

  function handleOnPoints (points: number): void {
    player.points.push(points);
    player.score = player.points.reduce((acc, curr) => acc + curr, 0);
    onPlayerChange(player);
  };

  function handleOpenPrompt(): void {
    setIsPromptOpen(true);
  };

  const promptLabel = `Inserisci nuovo punteggio ${
    game.hasNegativePoints ? (multi === 1 ? "(+)" : "(-)") : ""
  }`;

  return (
    <>
      <Prompt
        active={isPromptOpen}
        onValue={handleOnPointsStr}
        onClose={() => setIsPromptOpen(false)}
        type="number"
        label={promptLabel}
      />
      <div
        className={`flex flex-col flex-1 h-full ${
          last ? "" : "border-r-[1px]"
        } ${player.winner && "bg-green-900 bg-opacity-70 text-white"} ${
          player.loser && "bg-red-900 bg-opacity-70 text-white"
        }  `}
      >
        <div className="p-2 border-b-[1px]">
          <p>{player.name.toCapitalCase()}</p>
        </div>

        <div className="flex-1">
          {player.points.map((p, i) => (
            <PlayerPoint
              game={game}
              key={`p-${p}-${i}-${(Math.random() * 100).toFixed(0)}`}
              player={player}
              index={i}
              onPlayerChange={onPlayerChange}
            />
          ))}
        </div>

        <div className="p-2 border-y-[1px]">
          <p>
            <span className="text-gray-400">Tot:</span> {player.score}
          </p>
        </div>

        <div className="p-1 flex flex-col gap-1 items-center">
          <Button
            theme="success"
            className="w-full py-1 flex justify-center"
            onClick={() => {
              if (game.addType === "points") {
                handleOpenPrompt();
                setMulti(1);
              } else {
                handleOnPoints(1);
              }
            }}
          >
            <IoAdd size={24} />
          </Button>
          {game.hasNegativePoints && (
            <Button
              theme="error"
              className="w-full py-1 flex justify-center"
              onClick={() => {
                handleOpenPrompt();
                setMulti(-1);
              }}
            >
              <IoRemove size={24} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchPlayer;
