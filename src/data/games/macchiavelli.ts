import { Game } from "@/types/game";

const Macchiavelli: Game = {
  id: "macchiavelli",
  name: "Macchiavelli",
  mode: "lose",
  addType: "points",
  defaultPoints: [51, 101, 151],
  hasNegativePoints: false,
} as const;

export default Macchiavelli;
