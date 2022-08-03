import Player from "./Player";

export default interface Match {
	name: string;
	date: Date;
	finished: boolean;
	players: Player[];
}
