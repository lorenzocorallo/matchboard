import { Game } from "@/types/Game";

const Briscola: Game = {
  id: "briscola",
  name: "Briscola",
  mode: "win",
  addType: "wins",
  defaultPoints: [3, 5, 10],
  hasNegativePoints: false,
} as const;

export default Briscola;
