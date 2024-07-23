import { Link } from "react-router-dom";
import GAMES from "@/data/games/";
import Header from "@/components/header";
import Paper from "@/components/paper";
import Wrapper from "@/components/wrapper";

export default function GameSelect() {
  return (
    <Wrapper>
      <Header backPath="/" title="Scegli gioco" />
      <div className="flex flex-col items-center gap-4 w-full p-4">
        {GAMES.map((game) => (
          <Link key={game.id} to={`/new/${game.id}`} className="w-full text-xl">
            <Paper>{game.name}</Paper>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
}
