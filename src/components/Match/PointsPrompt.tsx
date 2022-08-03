import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Button from "../Button";
import TextField from "../TextField";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
	active: boolean;
	onValue: (num: number) => void;
	onClose: () => void;
}

const PointsPrompt = ({ active, onValue, onClose }: Props) => {
	const [value, setValue] = useState<number>();
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onValue(value || 0);
	};

	useEffect(() => {
		if (!inputRef.current || !active) return;
		setTimeout(() => {
			inputRef.current!.focus();
		}, 200);
	}, [inputRef, active]);
	return (
		<form
			className={`absolute top-0 left-0 grid place-content-center bg-black opacity-80 h-screen w-screen transition-all ${
				active ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"
			}`}
			onSubmit={handleSubmit}
		>
			<p className="text-xl font-bold">Inserisci il punteggio</p>
			<div className="flex justify-center items-center">
				<Button theme="error" onClick={onClose}>
					X
				</Button>
				<TextField ref={inputRef} type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
				<Button theme="success" type="submit">
					Ok
				</Button>
			</div>
		</form>
	);
};

export default PointsPrompt;
