export default interface Player {
	id: string;
	name: string;
	points: number[];
	score: number;
	winner?: boolean;
	loser?: boolean;
}
