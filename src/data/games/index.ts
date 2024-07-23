import { Game } from "@/types/Game";
import Briscola from "./briscola";
import Burraco from "./burraco";
import Macchiavelli from "./macchiavelli";
import Scopa from "./scopa";

const GAMES: readonly Game[] = [
  Burraco,
  Macchiavelli,
  Scopa,
  Briscola,
] as const;

export default GAMES;
