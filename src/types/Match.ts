import { GAMES } from "./../constants";
import Player from "./Player";

export type Game = typeof GAMES[number];

export default interface Match {
	id: string;
	name: string;
	date: Date;
	finished: boolean;
	game: Game;
	players: Player[];
	pointsToWin: number;
}
