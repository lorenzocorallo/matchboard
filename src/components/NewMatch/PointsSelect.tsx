import { useCallback, useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { Game } from "../../types/Game";
import Paper from "../Paper";
import Prompt from "../Prompt";
import Switch from "../Switch";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  game: Game;
  onValue: (n: number) => void;
  label?: string;
}
export default function PointsSelect({ game, label, onValue }: Props) {
  const { defaultPoints, deltaPoints } = game;
  const [points, setPoints] = useState<number[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<number>(0);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isWithDelta, setIsWithDelta] = useState<boolean>(false);

  useEffect(() => {
    setPoints(defaultPoints.map(p => isWithDelta && deltaPoints ? p + deltaPoints : p));
  }, [isWithDelta, deltaPoints, defaultPoints]);

  useEffect(() => {
    const middlePointsIdx = parseInt((points.length / 2).toFixed(0)) - 1;
    const defaultPoints = points[middlePointsIdx];
    setSelectedPoints(defaultPoints);
    onValue(defaultPoints);
  }, [onValue, points]);

  const handleOnValue = useCallback((n: number, custom: boolean = false) => {
    setIsCustom(custom);
    setSelectedPoints(n);
    onValue(n);
  }, [onValue]);

  return (
    <Paper>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg w-full text-left">
          {label ||
            (game.mode === "win" ? "Punti per vincere" : "Punti per perdere")}
        </p>
        {deltaPoints && (
        <div className="flex items-center gap-2">
          +5
          <Switch active={isWithDelta} onClick={() => setIsWithDelta((v) => !v)} />
        </div>
        )}
      </div>

      <div className="flex gap-3 justify-start items-center w-full">
        {points.map((v) => (
          <Switch
            key={v}
            active={selectedPoints === v}
            onClick={(_) => handleOnValue(v)}
            activeLabel={v.toString()}
            inactiveLabel={v.toString()}
          />
        ))}
        <CustomPoints
          isCustom={isCustom}
          onValue={(v) => handleOnValue(v, true)}
        />
      </div>
    </Paper>
  );
}

interface CustomPointsProps {
  isCustom: boolean;
  onValue: (n: number) => void;
}
function CustomPoints ({ isCustom, onValue }: CustomPointsProps) {
  const [active, setActive] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");

  const open = () => {
    setActive(true);
  };
  const close = () => {
    setActive(false);
  };

  const handleValue = (value: string) => {
    if (value === "" || isNaN(parseInt(value))) return;
    setLabel(value);
    const points = parseInt(value);
    onValue(points);
  };

  return (
    <>
      <Switch
        active={isCustom}
        onClick={open}
        activeLabel={
          <div className="flex items-center gap-2">
            {label} <IoPencil />
          </div>
        }
        inactiveLabel={
          <p className="flex items-center gap-2">
            <IoPencil size={20} />
          </p>
        }
      />
      <Prompt
        label="Punteggio personalizzato"
        active={active}
        type="number"
        onValue={handleValue}
        onClose={close}
      />
    </>
  );
};

