import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import Button from "./button";
import Overlay from "./overlay";
import TextField from "./text-field";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  active: boolean;
  onValue: (value: string) => void;
  onClose: () => void;
  onDelete?: () => void;
  value?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  showInput?: boolean;
  showPrevValue?: boolean;
}

function Prompt({
  value: prevValue,
  active,
  onValue,
  onClose,
  onDelete,
  label,
  type = "text",
  showInput = true,
  showPrevValue = true,
}: Props) {
  const hasPrevValue = prevValue !== undefined && prevValue.length > 0;
  const [value, setValue] = useState<string>(hasPrevValue ? prevValue : "");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onValue(value);
    onClose();
    setValue("");
  };

  function handleAbort(): void {
    onClose();
    setValue("");
  }

  useEffect(() => {
    if (!inputRef.current) return;
    if (active) inputRef.current.focus();
    else inputRef.current.blur();
  }, [inputRef, active]);

  return (
    <Overlay active={active} onClose={handleAbort}>
      <form onSubmit={handleSubmit}>
        <p className="text-xl font-bold">
          {label ||
            (hasPrevValue ? "Modifica punteggio" : "Inserisci nuovo punteggio")}
        </p>
        {showInput && (
          <div className="flex justify-center items-center gap-1 my-2">
            <TextField
              pattern={type === "number" ? "[0-9]*" : undefined}
              inputMode={type === "number" ? "numeric" : undefined}
              autoFocus
              ref={inputRef}
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button theme="success" type="submit">
              <IoCheckmark size={24} />
            </Button>
          </div>
        )}
        {hasPrevValue && (
          <>
            {showPrevValue && 
              <p className="text-gray-600 dark:text-gray-400 pointer-events-none select-none">
                Prima della modifica: <strong>{prevValue}</strong>
              </p>
            }
            {onDelete && (
              <Button
                theme="error"
                className="mt-3"
                onClick={onDelete}
                type="button"
              >
                Rimuovi
              </Button>
            )}
          </>
        )}
      </form>
    </Overlay>
  );
}

export default Prompt;
