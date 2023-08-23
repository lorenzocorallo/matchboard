import { Game } from "../../types/Game";

const Burraco: Game = {
  id: "burraco",
  name: "Burraco",
  mode: "win",
  addType: "points",
  defaultPoints: [1000, 2000],
  deltaPoints: 5,
  hasNegativePoints: true,
} as const;

export default Burraco;
