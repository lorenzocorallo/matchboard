import Player from "./Player";

export default interface Match {
	id: string;
	name: string;
	date: Date;
	finished: boolean;
	players: Player[];
}
