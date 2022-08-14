import { Link } from "react-router-dom";
import Match from "../../types/Match";
import Paper from "../Paper";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	match: Match;
}

const MatchCard = ({ match: m }: Props) => {
	return (
		<Link to={`/match/${m.id}`}>
			<Paper className="w-full cursor-pointer text-left">
				<p>{m.name}</p>
				<div className="flex justify-between">
					<p className={m.finished ? "text-green-400" : "text-orange-400 dark:text-yellow-400"}>
						{m.finished ? "Finita" : "In Corso"}
					</p>
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
};

export default MatchCard;
