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
  showNegativeAdd: boolean;
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
        label={
          multi === 1
            ? "Inserisci nuovo punteggio (+)"
            : "Inserisci nuovo punteggio (-)"
        }
      />
      <div
        className={`flex flex-col flex-1 h-full ${
          last ? "" : "border-r-[1px]"
        } ${player.winner && "bg-green-900 bg-opacity-70 text-white"} ${
          player.loser && "bg-red-900 bg-opacity-70 text-white"
        }  `}
      >
        <div className="p-2 border-b-[1px]">
          <p>
            {player.name.toCapitalCase()}
          </p>
        </div>

        <div className="flex-1">
          {player.points.map((p, i) => (
            <PlayerPoint
              key={`p-${p}-${i}-${(Math.random() * 100).toFixed(0)}`}
              player={player}
              index={i}
              onPlayerChange={onPlayerChange}
            />
          ))}
        </div>

        <div className="p-2 border-y-[1px]">
          <p><span className="text-gray-400">Tot:</span> {player.score}</p>
        </div>

        <div className="p-1 flex flex-col gap-1 items-center">
          <Button
            theme="success"
            className="w-full py-1 flex justify-center"
            onClick={() => {
              open();
              setMulti(1);
            }}
          >
            <IoAdd size={24} />
          </Button>
          <Button
            theme="error"
            className="w-full py-1 flex justify-center"
            onClick={() => {
              open();
              setMulti(-1);
            }}
          >
            <IoRemove size={24} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MatchPlayer;
