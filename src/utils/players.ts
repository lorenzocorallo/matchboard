import { v4 as uuidv4 } from "uuid";
import Player from "../types/Player";

interface CreatePlayerProps extends Partial<Player> {
  name: string;
}

export function createPlayer({
  name,
  score = 0,
  points = [],
  winner = false,
  loser = false,
}: CreatePlayerProps): Player {
  return {
    id: uuidv4(),
    name,
    score,
    winner,
    loser,
    points,
  };
}
