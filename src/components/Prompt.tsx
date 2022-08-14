import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import Button from "./Button";
import Overlay from "./Overlay";
import TextField from "./TextField";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
	active: boolean;
	onValue: (value: string) => void;
	onClose: () => void;
	onDelete?: () => void;
	value?: string;
	label?: string;
	type?: React.HTMLInputTypeAttribute;
}

const Prompt = ({ value: prevValue, active, onValue, onClose, onDelete, label, type }: Props) => {
	const [value, setValue] = useState<string>("");
	const [isChange, setIsChange] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onValue(value);
		onClose();
		setValue("");
	};

	useEffect(() => {
		if (!inputRef.current) return;
		if (active) inputRef.current.focus();
		else inputRef.current.blur();
	}, [inputRef, active]);

	useEffect(() => {
		if (!prevValue || prevValue.length === 0) return;
		setIsChange(true);
		setValue(prevValue);
	}, [prevValue]);

	return (
		<Overlay active={active} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<p className="text-xl font-bold">{label || (isChange ? "Modifica punteggio" : "Inserisci nuovo punteggio")}</p>
				<div className="flex justify-center items-center">
					<TextField
						autoFocus
						ref={inputRef}
						type={type || "text"}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<Button theme="success" type="submit">
						<IoCheckmark size={24} />
					</Button>
				</div>
				{isChange && (
					<>
						<p className="text-gray-600 dark:text-gray-400 pointer-events-none select-none">
							Prima della modifica: <strong>{prevValue}</strong>
						</p>
						<Button theme="error" className="mt-3" onClick={onDelete} type="button">
							Rimuovi
						</Button>
					</>
				)}
			</form>
		</Overlay>
	);
};

export default Prompt;
