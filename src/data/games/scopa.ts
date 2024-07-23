import { Game } from "@/types/game";

const Scopa: Game = {
  id: "scopa",
  name: "Scopa",
  mode: "win",
  addType: "points",
  defaultPoints: [11, 21, 31],
  hasNegativePoints: false,
} as const;

export default Scopa;
