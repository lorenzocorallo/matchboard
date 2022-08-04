import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import Button from "../Button";
import TextField from "../TextField";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
	active: boolean;
	onValue: (num: number) => void;
	onClose: () => void;
}

const PointsPrompt = ({ active, onValue, onClose }: Props) => {
	const [value, setValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onValue(parseInt(value) || 0);
		setValue("");
	};

	useEffect(() => {
		if (!inputRef.current || !active) return;
		inputRef.current.focus();
	}, [inputRef, active]);

	return (
		<form
			className={`absolute top-0 left-0 pt-[30%] bg-black opacity-80 h-screen w-screen transition-all ${
				active ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"
			}`}
			onSubmit={handleSubmit}
		>
			<p className="text-xl font-bold">Inserisci il punteggio</p>
			<div className="flex justify-center items-center">
				<Button theme="error" onClick={onClose}>
					<IoClose size={24} />
				</Button>
				<TextField ref={inputRef} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
				<Button theme="success" type="submit">
					<IoCheckmark size={24} />
				</Button>
			</div>
		</form>
	);
};

export default PointsPrompt;
