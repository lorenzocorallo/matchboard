import { Game } from "./game";
import Player from "./player";

export default interface Match {
  id: string;
  game: Game;
  name: string;
  date: Date;
  finished: boolean;
  players: Player[];
  chosenPoints: number;
}
