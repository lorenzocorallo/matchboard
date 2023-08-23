import { Game } from "./Game";
import Player from "./Player";

export default interface Match {
	id: string;
  game: Game;
	name: string;
	date: Date;
	finished: boolean;
	players: Player[];
	chosenPoints: number;
}
