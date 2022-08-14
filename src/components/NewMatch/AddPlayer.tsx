import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Player from "../../types/Player";
import Button from "../Button";
import Overlay from "../Overlay";
import TextField from "../TextField";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	active: boolean;
	onPlayer: (p: Player) => void;
	onClose: () => void;
}

const AddPlayer = ({ active, onClose, onPlayer, ...props }: Props) => {
	const [name, setName] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const player: Player = {
			name,
			points: [],
			score: 0,
			id: uuidv4(),
		};
		onPlayer(player);
		setName("");
	};

	useEffect(() => {
		if (!inputRef.current) return;
		if (active) inputRef.current.focus();
		else inputRef.current.blur();
	}, [inputRef, active]);

	return (
		<Overlay active={active} onClose={onClose} {...props}>
			<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
				<p className="text-xl">Aggiungi giocatore/squadra</p>
				<TextField label="Nome" inline value={name} onChange={(e) => setName(e.target.value)} ref={inputRef} />
				<Button theme="success" className="text-xl">
					Conferma
				</Button>
			</form>
		</Overlay>
	);
};

export default AddPlayer;
