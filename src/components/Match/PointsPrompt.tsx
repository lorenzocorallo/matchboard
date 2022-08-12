import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import Button from "../Button";
import TextField from "../TextField";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
	active: boolean;
	onValue: (num: number) => void;
	onClose: () => void;
	onDelete?: () => void;
	modifyPoint?: number;
}

const PointsPrompt = ({ modifyPoint, active, onValue, onClose, onDelete }: Props) => {
	const [value, setValue] = useState<string>(modifyPoint?.toString() || "");
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onValue(parseInt(value) || 0);
		setValue("");
	};

	useEffect(() => {
		if (!inputRef.current) return;
		if (active) {
			inputRef.current.focus();
		} else {
			inputRef.current.blur();
		}
	}, [inputRef, active]);

	return (
		<form
			className={`absolute top-0 left-0 pt-[30%] backdrop-blur-lg opacity-80 h-full w-full transition-all ${
				active ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"
			}`}
			onSubmit={handleSubmit}
		>
			<p className="text-xl font-bold">{modifyPoint ? "Modifica" : "Inserisci nuovo"} punteggio</p>
			<div className="flex justify-center items-center">
				<Button theme="error" onClick={onClose} type="button">
					<IoClose size={24} />
				</Button>
				<TextField autoFocus ref={inputRef} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
				<Button theme="success" type="submit">
					<IoCheckmark size={24} />
				</Button>
			</div>
			{modifyPoint && (
				<>
					<p className="text-gray-600 dark:text-gray-400 pointer-events-none select-none">
						Punteggio prima della modifica: <strong>{modifyPoint}</strong>
					</p>
					<Button theme="error" className="mt-3" onClick={onDelete} type="button">
						Rimuovi
					</Button>
				</>
			)}
		</form>
	);
};

export default PointsPrompt;
