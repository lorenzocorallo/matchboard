import { Link } from "react-router-dom";
import { GAMES } from "../../constants";
import { Game as GameType } from "../../types/Match";
import Header from "../Header";
import Paper from "../Paper";
import Wrapper from "../Wrapper";

interface GameProps {
	game: GameType;
}

const Game = ({ game }: GameProps) => {
	return (
		<Link to={`/new/${game}`} className="w-full text-xl">
			<Paper>{game[0].toUpperCase() + game.substring(1)}</Paper>
		</Link>
	);
};

const GameSelect = () => {
	return (
		<Wrapper>
			<Header backPath="/" title="Scegli gioco" />
			<div className="flex flex-col items-center gap-4 w-full p-4">
				{GAMES.map((game) => (
					<Game game={game} key={game} />
				))}
			</div>
		</Wrapper>
	);
};

export default GameSelect;
