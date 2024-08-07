import { useCallback, useState } from "react";
import { IoPencil } from "react-icons/io5";
import Paper from "@/components/paper";
import Prompt from "@/components/prompt";
import Switch from "@/components/switch";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  points: number[];
  isWithDelta: boolean;
  hasDeltaPoints: boolean;
  onWithDeltaToggle: () => void;
  selectedPoints: number;
  onValue: (n: number) => void;
  label?: string;
}
export default function PointsSelect({
  points,
  selectedPoints,
  onValue,
  hasDeltaPoints,
  isWithDelta,
  onWithDeltaToggle,
  label,
}: Props) {
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const handleOnValue = useCallback(
    (n: number, custom: boolean = false) => {
      setIsCustom(custom);
      onValue(n);
    },
    [onValue],
  );

  return (
    <Paper>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg w-full text-left">
          {label}
        </p>
        {hasDeltaPoints && (
          <div className="flex items-center gap-2">
            +5
            <Switch
              active={isWithDelta}
              onClick={onWithDeltaToggle}
            />
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
function CustomPoints({ isCustom, onValue }: CustomPointsProps) {
  const [label, setLabel] = useState<string>("");
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);

  function handleClosePrompt(): void {
    setIsPromptOpen(false);
  }

  function handleOpenPrompt(): void {
    setIsPromptOpen(true);
  }

  function handleValue(value: string): void {
    if (value === "" || isNaN(parseInt(value))) return;
    setLabel(value);
    const points = parseInt(value);
    onValue(points);
  }

  return (
    <>
      <Switch
        active={isCustom}
        onClick={handleOpenPrompt}
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
        active={isPromptOpen}
        type="number"
        onValue={handleValue}
        onClose={handleClosePrompt}
      />
    </>
  );
}
