import { Link } from "react-router-dom";
import Match from "@/types/match";
import Paper from "@/components/paper";
import MatchStateBubbles from "@/components/match-state-bubbles";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  match: Match;
}

function MatchCard({ match: m }: Props) {
  return (
    <Link to={`/match/${m.id}`}>
      <Paper className="w-full cursor-pointer text-left">
        <div className="flex items-center w-full">
          <MatchStateBubbles finished={m.finished} />
          <p className="ml-2">{m.name}</p>
          <div className="flex-grow" />
          <p className="px-2 py-1 bg-green-100 dark:bg-green-800 rounded-md dark:text-white">
            {m.game.name}
          </p>
        </div>

        <div className="flex justify-end w-full text-slate-500 dark:text-slate-300">
          <p>
            {m.date.toLocaleTimeString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </Paper>
    </Link>
  );
}

export default MatchCard;
